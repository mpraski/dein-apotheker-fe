import { Gateway } from '@/gateway'
import { Store, Plugin } from 'vuex'
import { RootState } from '@/store/types'
import { Answer, Mutations as AnswerMutations } from '@/store/answer/types'

export class Driver {
    constructor(private gateway: Gateway) { }

    public getPlugin(): Plugin<RootState> {
        return (store: Store<RootState>) => {
            store.subscribe((mutation, state) => {
                switch (mutation.type) {
                    case AnswerMutations.provideAnswer: {
                        const answer = mutation.payload as Answer
                        this.sendAnswer(store, answer)
                        break
                    }
                }
            })
        }
    }

    private sendAnswer(store: Store<RootState>, answer: Answer) {
        this.gateway.sendAnswer(answer)
            .then(response => {
                const { messages, input } = response
                // need to throttle that and show input as the last
                for (const message of messages) {
                    store.commit('sdsds', message)
                }

                store.commit('sdsd', input)
            })
            .catch(error => console.error(error))
    }
}
