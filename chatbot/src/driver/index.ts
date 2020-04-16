import { Gateway } from '@/gateway'
import { Store, Plugin, CommitOptions } from 'vuex'
import { RootState } from '@/store/types'
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
    this.queue.commit(this.namespaced(ns, type), payload, options)
  }

  private commitDirect (ns: string, type: string, payload?: any, options?: CommitOptions) {
    this.store.commit(this.namespaced(ns, type), payload, options)
  }

  private subscribe () {
    if (!this.store.state.token) {
      this.initiateChat()
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
      }
    })
  }

  private initiateChat () {
    this.recordContext(this.mockContext)
    this.recordQuestion(this.mockQuestion)
  }

  private sendAnswer (ctx: Context, answer: Answer) {
    this.commitDirect(inputNamespace, InputMutations.hideInput)
    this.commitDirect(messageNamespace, MessageMutations.receiveMessage, [
      {
        type: 'MESSAGE_TEXT',
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
      .then(response => {
        this.recordQuestion(response)
      })
      .catch(error => console.error(error))
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
    this.commit(inputNamespace, InputMutations.showInput, input)
  }

  private get mockContext (): Context {
    return {
      scenarios: [],
      data: {}
    }
  }

  private get mockQuestion (): Question {
    return {
      ID: 'symptom',
      messages: [
        {
          type: 'MESSAGE_TEXT',
          content: 'For which **symptom** are you looking for a drug?'
        }
      ],
      input: {
        type: 'INPUT_MULTIPLE',
        options: [
          {
            id: 'running_nose',
            content: 'Running nose'
          },
          {
            id: 'fever',
            content: 'Fever'
          }
        ]
      },
      scenario: 'scenario_demo'
    } as Question
  }
}
