import {
  Answer,
  Database,
  Product,
  QuestionOption,
  Message as APIMessage,
  Actions as ChatActions,
  Mutations as ChatMutation
} from '@/store/chat/types'
import {
  RootState,
  Mutations as RootMutations,
  Actions as RootActions
} from '@/store/types'
import {
  Actions as ScrollerActions,
  defaultIncrement
} from '@/store/scroller/types'
import { AnswerResponse, ChatService, SessionService } from '@/gateway/types'
import { Message, Actions as MessageActions, MessageData, MessageState } from '@/store/message/types'
import { Store, DispatchOptions } from 'vuex'
import { chatNamespace } from '@/store/chat'
import { messageNamespace } from '@/store/message'
import { scrollerNamespace } from '@/store/scroller'
import { HTTPError } from '@/client/errors'
import { Code } from '@/client/code'
import { Queue } from './queue'

export class Driver {
  private chat: ChatService;
  private session: SessionService;
  private queue?: Queue<RootState>;
  private store?: Store<RootState>;

  constructor(
    chat: ChatService,
    session: SessionService
  ) {
    this.chat = chat
    this.session = session
  }

  public async start() {
    if (this.currentToken && await this.session.has()) {
      return this.dispatch('', RootActions.setToken, this.currentToken)
    }

    return this.dispatch('', RootActions.requestSession)
  }

  public subscribe(store: Store<RootState>) {
    this.store = store
    this.queue = new Queue<RootState>(store)

    store.subscribe((mutation, _) => {
      switch (mutation.type) {
        case RootMutations.requestSession: {
          this.newSession()
          break
        }
        case RootMutations.receiveSession: {
          this.dispatch(chatNamespace, ChatMutation.addAnswer, this.emptyAnswer)
          break
        }
        case this.namespaced(chatNamespace, ChatMutation.addMessage): {
          this.prepareForAnswer(mutation.payload as APIMessage)
          break
        }
        case this.namespaced(chatNamespace, ChatMutation.addAnswer): {
          this.answer(mutation.payload as Answer)
          break
        }
        case this.namespaced(chatNamespace, ChatMutation.revert): {
          this.revert(mutation.payload as [number, string])
          break
        }
        case this.namespaced(scrollerNamespace, ScrollerActions.allocate): {
          this.dispatch(messageNamespace, MessageActions.addHeight, this.currentHeight)
          break
        }
      }
    })
  }

  private async newSession() {
    await Promise.all([
      this.dispatch(chatNamespace, ChatActions.clear),
      this.dispatch(messageNamespace, MessageActions.clear),
      this.dispatch(scrollerNamespace, ScrollerActions.clear)
    ])

    return this.session.new().then(({ csrf_token: token }) =>
      this.dispatch('', RootActions.receiveSession, token)
    )
  }

  private async answer(answer: Answer) {
    await this.dispatch(chatNamespace, ChatActions.hideInput)

    const text = this.formatAnswer(answer)

    if (text) {
      await this.dispatchQueue(messageNamespace, MessageActions.addMessage, [
        {
          type: 'text',
          content: text
        } as Message,
        {
          alignment: 'RIGHT',
          state: this.currentState!,
          when: Date.now()
        } as MessageData
      ])
    }

    let response: AnswerResponse

    try {
      response = await this.chat.answer(answer)
    } catch (e) {
      if (HTTPError.is(e, Code.UNAUTHORIZED)) {
        return this.dispatch('', RootActions.requestSession)
      }

      throw e
    }

    const payload = [response.id, response.message, response.cart]
    const dispatcher = this.initialState
      ? this.dispatch.bind(this)
      : this.dispatchQueue.bind(this)

    return dispatcher(chatNamespace, ChatActions.addResponse, payload)
  }

  private async prepareForAnswer({ text, type, input }: APIMessage) {
    const dispatcher = this.initialState
      ? this.dispatch.bind(this)
      : this.dispatchQueue.bind(this)

    if (text.length) {
      await dispatcher(messageNamespace, MessageActions.addMessage, [
        {
          type: 'text',
          content: text
        } as Message,
        {
          alignment: 'LEFT'
        } as MessageData
      ])
    }

    if (type === 'product') {
      const product = input as Product

      await dispatcher(messageNamespace, MessageActions.addMessage, [
        {
          type: 'product',
          name: product.name,
          image: product.image
        } as Message,
        {
          alignment: 'LEFT'
        } as MessageData
      ])
    }

    dispatcher(scrollerNamespace, ScrollerActions.allocate, defaultIncrement())

    return dispatcher(chatNamespace, ChatActions.showInput)
  }

  private formatAnswer({ answer }: Answer): string | undefined {
    if (!this.currentMessage) return undefined

    const { type, input } = this.currentMessage

    switch (type) {
      case 'list':
      case 'product_list': {
        const selected = answer as Array<string>
        const { rows } = input as Database
        const filtered = rows
          .filter((r, _) => selected.includes(r.id))
          .map((r, _) => r.name)

        return filtered.length ? filtered.join(', ') : undefined
      }
      case 'question':
      case 'comment': {
        const choice = answer as string
        const options = input as Array<QuestionOption>
        const filtered = options.filter((o, _) => { return o.id === choice })

        return filtered.length ? filtered[0].text : undefined
      }
      case 'product': {
        if (answer) {
          return (input as Product).name
        }

        return 'Thanks, I\'ll pass'
      }
      case 'free': return answer as string
    }
  }

  private async revert([index, state]: [number, string]) {
    const [_, { height }] = this.messageAt(index)

    await Promise.all([
      this.dispatch(chatNamespace, ChatActions.hideInput),
      this.dispatch(messageNamespace, MessageActions.revert, index)
    ])

    await this.dispatch(scrollerNamespace, ScrollerActions.revert, height)

    let response: AnswerResponse

    try {
      response = await this.chat.revert({ state })
    } catch (e) {
      if (HTTPError.is(e, Code.UNAUTHORIZED)) {
        return this.dispatch('', RootActions.requestSession)
      }

      throw e
    }

    const payload = [response.id, response.message, response.cart]

    await this.dispatch(chatNamespace, ChatActions.revertResponse, payload)

    return this.dispatchQueue(chatNamespace, ChatActions.showInput)
  }

  private get currentToken(): string | undefined {
    return this.store?.state.token
  }

  private get currentMessage(): APIMessage | undefined {
    return (this.store?.state as any).chat.message
  }

  private get initialState(): boolean {
    return (this.store?.state as any).chat.states.length < 2
  }

  private get currentState(): string | undefined {
    const states = (this.store?.state as any).chat.states as string[]

    if (states.length) {
      return states[states.length - 1]
    }

    return undefined
  }

  private get currentHeight(): number {
    return (this.store?.state as any).scroller.height
  }

  private get emptyAnswer(): Answer {
    return {
      state: 'new',
      answer: null
    }
  }

  private messageAt(idx: number): [Message, MessageData] {
    const messages = (this.store?.state as any).message as MessageState
    return messages[idx]
  }

  private namespaced(ns: string, path: string): string {
    return ns === '' ? path : `${ns}/${path}`
  }

  private async dispatch(
    ns: string,
    type: string,
    payload?: any,
    options?: DispatchOptions
  ) {
    return this.store?.dispatch(this.namespaced(ns, type), payload, options)
  }

  private async dispatchQueue(
    ns: string,
    type: string,
    payload?: any,
    options?: DispatchOptions
  ) {
    return this.queue?.dispatch(this.namespaced(ns, type), payload, options)
  }
}
