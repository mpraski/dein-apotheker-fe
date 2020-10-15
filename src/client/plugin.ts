import { Store } from 'vuex'
import { Client } from './index'
import { RootState, Mutations as RootMutations } from '@/store/types'

export const fetchToken = (client: Client) => (store: Store<RootState>) => {
    store.subscribe((mutation, _) => {
        switch (mutation.type) {
            case RootMutations.receiveSession:
            case RootMutations.setToken:
                client.setToken(mutation.payload as string)
        }
    })
}
