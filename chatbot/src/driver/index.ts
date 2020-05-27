import { Gateway } from '@/gateway'
import { Store, Plugin, CommitOptions } from 'vuex'
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

  constructor (
    private gateway: Gateway,
    private store: Store<RootState>
  ) {
    this.queue = new Queue(store)
    this.subscribe()
  }

  public static plugin (gateway: Gateway): Plugin<RootState> {
    return (store: Store<RootState>) => {
      /* eslint-disable no-new */
      new Driver(gateway, store)
    }
  }

  private namespaced (ns: string, path: string): string {
    return `${ns}/${path}`
  }

  private commit (ns: string, type: string, payload?: any, options?: CommitOptions) {
    const dest = ns === '' ? type : this.namespaced(ns, type)
    this.queue.commit(dest, payload, options)
  }

  private commitDirect (ns: string, type: string, payload?: any, options?: CommitOptions) {
    const dest = ns === '' ? type : this.namespaced(ns, type)
    this.store.commit(dest, payload, options)
  }

  private subscribe () {
    if (this.needsToken) {
      this.fetchToken()
    }

    this.store.subscribe((mutation, state) => {
      switch (mutation.type) {
        case this.namespaced(answerNamespace, AnswerMutations.addAnswer): {
          const answer = mutation.payload as Answer
          const context = this.store.getters[this.namespaced(answerNamespace, AnswerGetters.currentContext)] as Context
          this.sendAnswer(context, answer)
          break
        }
        case this.namespaced(answerNamespace, AnswerMutations.rewind): {
          const count = (state as any).answer.rewindMessages as number
          const input = this.store.getters[this.namespaced(answerNamespace, AnswerGetters.currentQuestion)].input
          this.rewind(count, input)
          break
        }
        case RootMutations.provideToken: {
          this.initiateChat(mutation.payload as Token)
          break
        }
      }
    })
  }

  private fetchToken () {
    this.gateway.token()
      .then(token => this.commitDirect('', RootMutations.provideToken, token))
      .catch(error => {
        this.recordError(error)
      })
  }

  private initiateChat (token: Token) {
    this.gateway.setToken(token)
    this.gateway.start({
      scenarios: [],
      question: '',
      data: {}
    })
      .then(response => {
        const { context, data } = response
        this.recordContext(context)
        return data
      })
      .then(question => {
        this.recordQuestionDirect(question)
      })
      .catch(error => {
        this.recordError(error)
      })
  }

  private sendAnswer (ctx: Context, answer: Answer) {
    this.commitDirect(inputNamespace, InputMutations.hideInput)
    this.commitDirect(messageNamespace, MessageMutations.receiveMessage, [
      {
        type: 'text',
        content: formatAnswer(answer)
      } as Message,
      'RIGHT'
    ])

    this.gateway.answer(ctx, answer)
      .then(response => {
        const { context, data } = response
        this.recordContext(context)
        return data
      })
      .then(question => {
        this.recordQuestion(question)
      })
      .catch(error => {
        this.recordError(error)
      })
  }

  private rewind (count: number, input: Input) {
    this.commitDirect(messageNamespace, MessageMutations.rewind, count)
    this.commitDirect(inputNamespace, InputMutations.hideInput)
    this.commit(inputNamespace, InputMutations.showInput, input)
  }

  private recordContext (ctx: Context) {
    this.commitDirect(answerNamespace, AnswerMutations.addContext, ctx)
  }

  private recordQuestion (question: Question) {
    const { messages, input } = question

    this.commitDirect(answerNamespace, AnswerMutations.addQuestion, question)
    for (const message of messages) {
      this.commit(messageNamespace, MessageMutations.receiveMessage, [message, 'LEFT'])
    }
    this.commitDirect(inputNamespace, InputMutations.hideInput)
    this.commit(inputNamespace, InputMutations.showInput, input)
  }

  private recordQuestionDirect (question: Question) {
    const { messages, input } = question

    this.commitDirect(answerNamespace, AnswerMutations.addQuestion, question)
    for (const message of messages) {
      this.commitDirect(messageNamespace, MessageMutations.receiveMessage, [message, 'LEFT'])
    }
    //this.commitDirect(inputNamespace, InputMutations.hideInput)
    this.commitDirect(inputNamespace, InputMutations.showInput, input)
  }

  private recordError (error: string) {
    this.commit(messageNamespace, MessageMutations.receiveMessage, [
      {
        type: 'text',
        content: error
      } as Message,
      'LEFT'
    ])
  }

  private get needsToken (): boolean {
    return !this.store.state.token
  }
}
