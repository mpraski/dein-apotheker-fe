import { ActionTree } from 'vuex'
import { Chat, ChatState, Actions, Mutations } from './types'
import { RootState, ValueOf } from '@/store/types'

type ActionDefinition = {
  [K in Actions]: ValueOf<ActionTree<ChatState, RootState>>;
}

export const actions: ActionDefinition = {
  [Actions.addChat]({ commit }, chat: Chat) {
    commit(Mutations.addChat, chat)
  }
}
