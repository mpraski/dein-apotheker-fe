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
import { AnswerResponse, ChatService, SessionService } from '@/gateway/types'
import { Message, Actions as MessageActions, MessageData } from '@/store/message/types'
import { Store, DispatchOptions } from 'vuex'
import { chatNamespace } from '@/store/chat'
import { messageNamespace } from '@/store/message'
import { HTTPError } from '@/client/errors'
import { Code } from '@/client/code'

export class Driver {
  private chat: ChatService;
  private session: SessionService;
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
      this.session.delete(),
      this.dispatch(chatNamespace, ChatActions.clear),
      this.dispatch(messageNamespace, MessageActions.clear)
    ])

    return this.session.new().then(({ csrf_token: token }) =>
      this.dispatch('', RootActions.receiveSession, token)
    )
  }

  private async answer(answer: Answer) {
    await this.dispatch(chatNamespace, ChatActions.hideInput)

    const text = this.formatAnswer(answer)

    if (text) {
      await this.dispatch(messageNamespace, MessageActions.addMessage, [
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

    return this.dispatch(chatNamespace, ChatActions.addResponse, payload)
  }

  private async prepareForAnswer({ text, type, input }: APIMessage) {
    if (text.length) {
      await this.dispatch(messageNamespace, MessageActions.addMessage, [
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

      await this.dispatch(messageNamespace, MessageActions.addMessage, [
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

    return this.dispatch(chatNamespace, ChatActions.showInput)
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

  private get emptyAnswer(): Answer {
    return {
      state: 'new',
      answer: null
    }
  }
}
