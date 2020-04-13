import { ActionTree } from 'vuex'
import { MessageState, Message, Alignment, Actions, Mutations } from './types'
import { RootState, ValueOf } from '@/store/types'

type ActionDefinition = {
  [K in Actions]: ValueOf<ActionTree<MessageState, RootState>>;
}

export const actions: ActionDefinition = {
  [Actions.receiveMessage] ({ commit }, message: [Message, Alignment, string]): any {
    commit(Mutations.receiveMessage, message)
  },

  [Actions.rewind] ({ commit }, amount: number): any {
    commit(Mutations.rewind, amount)
  }
}
