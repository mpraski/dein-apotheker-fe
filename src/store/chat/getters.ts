import { GetterTree } from 'vuex'
import { Chat, ChatState, Getters } from './types'
import { RootState, ValueOf } from '@/store/types'

type GetterDefinition = {
  [K in Getters]: ValueOf<GetterTree<ChatState, RootState>>;
}

export const getters: GetterDefinition = {
  [Getters.currentChat](state): Chat | undefined {
    return state[state.length - 1]
  }
}
