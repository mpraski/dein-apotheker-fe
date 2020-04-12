import { Gateway } from '@/gateway'
import { Store, Plugin, CommitOptions, DispatchOptions } from 'vuex'
import { RootState, Mutations as RootMutatins } from '@/store/types'
import { answerNamespace } from '@/store/answer'
import { Message, Mutations as MessageMutations } from '@/store/message/types'
import { messageNamespace } from '@/store/message'
import { Answer, Mutations as AnswerMutations } from '@/store/answer/types'
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

    this.store.subscribe((mutation, state) => {
      switch (mutation.type) {
        case this.namespaced(answerNamespace, AnswerMutations.provideAnswer): {
          this.sendAnswer(mutation.payload as Answer)
          break
        }
      }
    })
  }

  private initiateChat () {
    const mockAnswer = {
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

    this.dispatchDirect(answerNamespace, AnswerMutations.changeScenario, mockAnswer.scenario)
    for (const message of mockAnswer.messages) {
      this.commit(messageNamespace, MessageMutations.receiveMessage, [message, 'LEFT'])
    }
    this.commit(inputNamespace, InputMutations.showInput, mockAnswer.input)
  }

  private sendAnswer (answer: Answer) {
    this.commitDirect(inputNamespace, InputMutations.hideInput)

    console.log(answer, this.formatAnswer(answer))

    this.commitDirect(messageNamespace, MessageMutations.receiveMessage, [
      {
        type: 'MESSAGE_TEXT',
        content: this.formatAnswer(answer)
      } as Message,
      'RIGHT'
    ])

    this.gateway.sendAnswer(answer)
      .then(response => {
        const { messages, scenario, input } = response

        this.dispatchDirect(answerNamespace, AnswerMutations.changeScenario, scenario)
        for (const message of messages) {
          this.commit(messageNamespace, MessageMutations.receiveMessage, [message, 'LEFT'])
        }
        this.commit(inputNamespace, InputMutations.showInput, input)
      })
      .catch(error => console.error(error))
  }

  private formatAnswer (a: Answer): string {
    if (Array.isArray(a)) {
      if (a.length === 1) {
        return a[0].content
      }

      return a.map(a => a.content).join()
    }

    if (a instanceof Object) {
      return a.content
    } else {
      return a
    }
  }
}
