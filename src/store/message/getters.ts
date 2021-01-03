import { GetterTree } from 'vuex'
import { Getters, Message, MessageState } from './types'
import { RootState, ValueOf } from '@/store/types'

type GetterDefinition = {
    [K in Getters]: ValueOf<GetterTree<MessageState, RootState>>;
}

export const getters: GetterDefinition = {
    [Getters.current](state): Message {
        return state[state.length - 1][0]
    }
}
