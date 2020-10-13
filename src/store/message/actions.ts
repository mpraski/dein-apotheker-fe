import { ActionTree } from 'vuex'
import { MessageState, Message, Alignment, Actions, Mutations } from './types'
import { RootState, ValueOf } from '@/store/types'

type ActionDefinition = {
  [K in Actions]: ValueOf<ActionTree<MessageState, RootState>>;
}

export const actions: ActionDefinition = {
  [Actions.addMessage]({ commit }, message: [Message, Alignment, string]) {
    commit(Mutations.addMessage, message)
  },
  [Actions.clear]({ commit }) {
    commit(Mutations.clear)
  }
}
