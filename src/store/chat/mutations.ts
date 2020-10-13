import { MutationTree } from 'vuex'
import { Chat, ChatState, emptyState, Mutations } from './types'
import { ValueOf } from '@/store/types'

type MutationDefinition = {
  [K in Mutations]: ValueOf<MutationTree<ChatState>>;
}

export const mutations: MutationDefinition = {
  [Mutations.addChat](state, chat: Chat) {
    state.states.push(chat.id)
    state.message = chat.message
    state.cart = chat.cart
  },
  [Mutations.clear](state) {
    state = emptyState()
  }
}
