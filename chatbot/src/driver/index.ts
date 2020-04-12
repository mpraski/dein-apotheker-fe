import { Gateway } from '@/gateway'
import { Store, Plugin, CommitOptions, DispatchOptions } from 'vuex'
import { RootState } from '@/store/types'
import { answerNamespace } from '@/store/answer'
import { Message, Mutations as MessageMutations } from '@/store/message/types'
import { messageNamespace } from '@/store/message'
import { Answer, Mutations as AnswerMutations, formatAnswer } from '@/store/answer/types'
import { inputNamespace } from '@/store/input'
import { Mutations as InputMutations } from '@/store/input/types'
import { Queue } from './queue'
import { AnswerResponse } from '@/gateway/types'

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
    console.log(this.namespaced(ns, type))
    this.store.commit(this.namespaced(ns, type), payload, options)
  }

  private dispatchDirect (ns: string, type: string, payload?: any, options?: DispatchOptions) {
    this.store.dispatch(this.namespaced(ns, type), payload, options)
  }

  private subscribe () {
    if (!this.store.state.token) {
      this.initiateChat()
    }

    this.store.subscribe((mutation, _state) => {
      switch (mutation.type) {
        case this.namespaced(answerNamespace, AnswerMutations.provideAnswer): {
          this.sendAnswer(mutation.payload as Answer)
          break
        }
      }
    })
  }

  private initiateChat () {
    this.showResponse(this.mockAnswer)
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

  private showResponse (a: AnswerResponse) {
    const { messages, scenario, input } = a

    this.dispatchDirect(answerNamespace, AnswerMutations.changeScenario, scenario)
    for (const message of messages) {
      this.commit(messageNamespace, MessageMutations.receiveMessage, [message, 'LEFT'])
    }
    this.commit(inputNamespace, InputMutations.showInput, input)
  }

  private get mockAnswer (): AnswerResponse {
    return {
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
    } as AnswerResponse
  }
}
