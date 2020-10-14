import { AnswerResponse, ChatService, SessionService } from '@/gateway/types'
import { Store, DispatchOptions } from 'vuex'
import { RootState, Mutations as RootMutations, Actions as RootActions } from '@/store/types'
import { Message, Actions as MessageActions } from '@/store/message/types'
import { Answer, Message as APIMessage, Actions as ChatActions, Mutations as ChatMutation } from '@/store/chat/types'
import { chatNamespace } from '@/store/chat'
import { messageNamespace } from '@/store/message'
import { HTTPError } from '@/client/error'
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
    if (await this.session.has()) {
      return null
    }

    return this.newSession()
  }

  public subscribe(store: Store<RootState>) {
    this.store = store

    store.subscribe((mutation, _) => {
      switch (mutation.type) {
        case this.namespaced(chatNamespace, ChatMutation.addMessage): {
          this.prepareForAnswer(mutation.payload as APIMessage)
          break
        }
        case this.namespaced(chatNamespace, ChatMutation.addAnswer): {
          this.answer(mutation.payload as Answer)
          break
        }
        case RootMutations.requestToken: {
          this.newSession()
          break
        }
        case RootMutations.setToken: {
          this.answer(this.emptyAnswer)
          break
        }
      }
    })
  }

  private async newSession() {
    await this.dispatch(chatNamespace, ChatActions.clear)
    await this.dispatch(messageNamespace, MessageActions.clear)

    const { csrf_token: token } = await this.session.new()

    return this.dispatch('', RootActions.setToken, token)
  }

  private async answer(answer: Answer) {
    await this.dispatch(chatNamespace, ChatActions.hideInput)
    await this.dispatch(messageNamespace, MessageActions.addMessage, [
      {
        type: 'text',
        content: answer.value
      } as Message,
      'RIGHT'
    ])

    let response: AnswerResponse

    try {
      response = await this.chat.answer(answer)
    } catch (e) {
      if (HTTPError.is(e, Code.UNAUTHORIZED)) {
        return this.newSession()
      }

      throw e
    }

    const payload = [response.id, response.message, response.cart]

    return this.dispatch(chatNamespace, ChatActions.addResponse, payload)
  }

  private async prepareForAnswer(message: APIMessage) {
    if (message.text.length) {
      await this.dispatch(messageNamespace, MessageActions.addMessage, [
        {
          type: 'text',
          content: message.text
        } as Message,
        'LEFT'
      ])
    }

    return this.dispatch(chatNamespace, ChatActions.showInput)
  }

  private namespaced(ns: string, path: string): string {
    return ns === '' ? path : `${ns}/${path}`
  }

  private async dispatch(ns: string, type: string, payload?: any, options?: DispatchOptions) {
    return this.store?.dispatch(this.namespaced(ns, type), payload, options)
  }

  private get emptyAnswer(): Answer {
    return {
      state: 'new',
      value: null
    }
  }
}
