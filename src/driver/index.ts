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
import { Message, Actions as MessageActions, MessageData } from '@/store/message/types'
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
          alignment: 'LEFT',
          when: Date.now()
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
          alignment: 'LEFT',
          when: Date.now()
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

  private get currentToken(): string | undefined {
    return this.store?.state.token
  }

  private get currentMessage(): APIMessage | undefined {
    return (this.store?.state as any).chat.message
  }

  private get initialState(): boolean {
    return (this.store?.state as any).chat.states.length < 2
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

  private get emptyAnswer(): Answer {
    return {
      state: 'new',
      answer: null
    }
  }
}
