import { ActionTree } from 'vuex'
import { MessageState, Message, Actions, Mutations } from './types'
import { RootState, ValueOf } from '@/store/types'

type ActionDefinition = {
  [K in Actions]: ValueOf<ActionTree<MessageState, RootState>>;
}

export const actions: ActionDefinition = {
  [Actions.receiveMessage] ({ commit }): any {
    commit(Mutations.receiveMessage, {
      type: 'MESSAGE_TEXT',
      alignment: 'LEFT',
      content: 'lelele'
    } as Message)
  }
}
