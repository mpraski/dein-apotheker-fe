import { Gateway } from '@/gateway'
import { Store, Plugin, CommitOptions, DispatchOptions } from 'vuex'
import { RootState } from '@/store/types'
import { answerNamespace } from '@/store/answer'
import { Answer, Mutations as AnswerMutations } from '@/store/answer/types'
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

    private dispatchDirect (ns: string, type: string, payload?: any, options?: DispatchOptions) {
      this.store.dispatch(this.namespaced(ns, type), payload, options)
    }

    private subscribe () {
      this.store.subscribe((mutation, state) => {
        switch (mutation.type) {
          case this.namespaced(answerNamespace, AnswerMutations.provideAnswer): {
            this.sendAnswer(mutation.payload as Answer)
            break
          }
        }
      })
    }

    private sendAnswer (answer: Answer) {
      this.commitDirect(inputNamespace, InputMutations.hideInput)

      this.gateway.sendAnswer(answer)
        .then(response => {
          const { messages, scenario, input } = response

          this.dispatchDirect(answerNamespace, AnswerMutations.changeScenario, scenario)
          for (const message of messages) {
            this.commit(answerNamespace, AnswerMutations.provideAnswer, message)
          }
          this.commit(inputNamespace, InputMutations.showInput, input)
        })
        .catch(error => console.error(error))
    }
}
