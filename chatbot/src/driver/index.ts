import { Gateway } from '@/gateway'
import { Store, Plugin, CommitOptions } from 'vuex'
import { RootState } from '@/store/types'
import { answerNamespace } from '@/store/answer'
import { Message, Mutations as MessageMutations } from '@/store/message/types'
import { messageNamespace } from '@/store/message'
import { Answer, Record, Question, Mutations as AnswerMutations, formatAnswer } from '@/store/answer/types'
import { inputNamespace } from '@/store/input'
import { Mutations as InputMutations } from '@/store/input/types'
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

    this.store.subscribe((mutation, _state) => {
      switch (mutation.type) {
        case this.namespaced(answerNamespace, AnswerMutations.addRecord): {
          const { answer } = mutation.payload as Record
          this.sendAnswer(answer)
          break
        }
      }
    })
  }

  private initiateChat () {
    this.showResponse(this.mockQuestion)
  }

  private sendAnswer (answer: Answer) {
    this.commitDirect(inputNamespace, InputMutations.hideInput)

    this.commitDirect(messageNamespace, MessageMutations.receiveMessage, [
      {
        type: 'MESSAGE_TEXT',
        content: formatAnswer(answer)
      } as Message,
      'RIGHT'
    ])

    this.gateway.sendAnswer(answer)
      .then(response => {
        this.showResponse(response)
      })
      .catch(error => console.error(error))
  }

  private showResponse (q: Question) {
    const { messages, input } = q

    this.commitDirect(answerNamespace, AnswerMutations.addQuestion, q)
    for (const message of messages) {
      this.commit(messageNamespace, MessageMutations.receiveMessage, [message, 'LEFT'])
    }
    this.commit(inputNamespace, InputMutations.showInput, input)
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
          }
        ]
      },
      scenario: 'scenario_demo'
    } as Question
  }
}
