import {
  Answer,
  Database,
  Product,
  QuestionOption,
  Message as APIMessage,
  Actions as ChatActions,
  Mutations as ChatMutation,
  ProductInput
} from '@/store/chat/types'
import {
  RootState,
  Mutations as RootMutations,
  Actions as RootActions
} from '@/store/types'
import { AnswerResponse, ChatService, SessionService } from '@/gateway/types'
import { Store, DispatchOptions } from 'vuex'
import { chatNamespace } from '@/store/chat'
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
        case this.namespaced(chatNamespace, ChatMutation.addAnswer): {
          this.answer(mutation.payload as Answer)
          break
        }
        case this.namespaced(chatNamespace, ChatMutation.addMessage): {
          this.dispatch(chatNamespace, ChatActions.showInput)
          break
        }
        case this.namespaced(chatNamespace, ChatMutation.revert): {
          this.revert(mutation.payload as [number, string])
          break
        }
      }
    })
  }

  private async newSession() {
    await this.dispatch(chatNamespace, ChatActions.clear)

    return this.session.new().then(({ csrf_token: token }) =>
      this.dispatch('', RootActions.receiveSession, token)
    )
  }

  private async answer(answer: Answer) {
    await this.dispatch(chatNamespace, ChatActions.hideInput)

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

  private async revert([index, state]: [number, string]) {
    return this.dispatchQueue(chatNamespace, ChatActions.showInput)
  }

  private get currentToken(): string | undefined {
    return this.store?.state.token
  }

  private get initialState(): boolean {
    return (this.store?.state as any).chat.states.length < 2
  }

  private get emptyAnswer(): Answer {
    return {
      state: 'new',
      answer: null
    }
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
