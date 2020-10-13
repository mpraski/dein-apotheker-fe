import { MutationTree } from 'vuex'
import { Chat, ChatState, Mutations } from './types'
import { ValueOf } from '@/store/types'

type MutationDefinition = {
  [K in Mutations]: ValueOf<MutationTree<ChatState>>;
}

export const mutations: MutationDefinition = {
  [Mutations.addChat](state, chat: Chat) {
    state.push(chat)
  }
}
