import { Store, Plugin } from 'vuex'
import { Client } from './index'
import { RootState, Mutations as RootMutations } from '@/store/types'

export const fetchToken: (client: Client) => Plugin<RootState> = (client: Client) => (store: Store<RootState>) => {
    store.subscribe((mutation, _) => {
        switch (mutation.type) {
            case RootMutations.provideToken: {
                client.setToken(mutation.payload as string)
            }
        }
    })
}
