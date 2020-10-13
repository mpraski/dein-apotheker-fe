import { AnswerRequest, ChatService, SessionService } from '@/gateway/types'
import { Store, CommitOptions } from 'vuex'
import { RootState, Mutations as RootMutations, Token } from '@/store/types'
import { answerNamespace } from '@/store/answer'
import { Message, Mutations as MessageMutations } from '@/store/message/types'
import { messageNamespace } from '@/store/message'
import { Question, Mutations as AnswerMutations, Getters as AnswerGetters, formatAnswer, Answer, Context } from '@/store/answer/types'
import { inputNamespace } from '@/store/input'
import { Mutations as InputMutations, Input } from '@/store/input/types'
import { Queue } from './queue'

export class Driver {
  private queue: Queue<RootState>;

  constructor(
    private chat: ChatService,
    private session: SessionService,
    private store: Store<RootState>
  ) {
    this.queue = new Queue(store)
    this.subscribe()
  }

  private namespaced(ns: string, path: string): string {
    return ns === '' ? path : `${ns}/${path}`
  }

  private commit(ns: string, type: string, payload?: any, options?: CommitOptions) {
    this.queue.commit(this.namespaced(ns, type), payload, options)
  }

  private commitDirect(ns: string, type: string, payload?: any, options?: CommitOptions) {
    this.store.commit(this.namespaced(ns, type), payload, options)
  }

  private subscribe() {
    this.store.subscribe((mutation, state) => {
      switch (mutation.type) {
        case this.namespaced(answerNamespace, AnswerMutations.addAnswer): {
          const answer = mutation.payload as Answer
          const context = this.store.getters[this.namespaced(answerNamespace, AnswerGetters.currentContext)] as Context
          this.sendAnswer(context, answer)
          break
        }
        case RootMutations.provideToken: {
          this.beginChat()
          break
        }
      }
    })

    this.checkSession()
  }

  private async checkSession() {
    const fetchToken = async () => {
      const { csrf_token: token } = await this.session.new()

      this.commitDirect('', RootMutations.provideToken, token)
    }

    if (this.needsToken) {
      return fetchToken()
    }

    if (await this.session.has()) {
      return
    }

    return fetchToken()
  }

  private beginChat() {
    this.chat.answer(this.emptyAnswer)
  }

  private sendAnswer(ctx: Context, answer: Answer) {
    this.commitDirect(inputNamespace, InputMutations.hideInput)
    this.commitDirect(messageNamespace, MessageMutations.receiveMessage, [
      {
        type: 'text',
        content: formatAnswer(answer)
      } as Message,
      'RIGHT'
    ])

    this.gateway.answer(ctx, answer)
      .then(({ context, data }) => {
        this.recordContext(context)
        return data
      })
      .then(this.recordQuestion.bind(this))
      .catch(this.recordError.bind(this))
  }

  private recordQuestion(question: Question) {
    const { messages, input } = question

    this.commitDirect(answerNamespace, AnswerMutations.addQuestion, question)
    for (const message of messages) {
      this.commit(messageNamespace, MessageMutations.receiveMessage, [message, 'LEFT'])
    }
    this.commitDirect(inputNamespace, InputMutations.hideInput)
    this.commit(inputNamespace, InputMutations.showInput, input)
  }

  private recordQuestionDirect(question: Question) {
    const { messages, input } = question

    this.commitDirect(answerNamespace, AnswerMutations.addQuestion, question)
    for (const message of messages) {
      this.commitDirect(messageNamespace, MessageMutations.receiveMessage, [message, 'LEFT'])
    }
    this.commitDirect(inputNamespace, InputMutations.showInput, input)
  }

  private recordError(error: string) {
    this.commit(messageNamespace, MessageMutations.receiveMessage, [
      {
        type: 'text',
        content: error
      } as Message,
      'LEFT'
    ])
  }

  private get needsToken(): boolean {
    return !this.store.state.token
  }

  private get emptyAnswer(): AnswerRequest {
    return {
      state: 'new',
      value: null
    }
  }
}
