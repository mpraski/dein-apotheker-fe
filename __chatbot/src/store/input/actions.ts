import { ActionTree } from 'vuex'
import { InputState, Input, Actions, Mutations } from './types'
import { RootState, ValueOf } from '@/store/types'

type ActionDefinition = {
  [K in Actions]: ValueOf<ActionTree<InputState, RootState>>;
}

export const actions: ActionDefinition = {
  [Actions.showInput] ({ commit }, payload: Input) {
    commit(Mutations.showInput, payload)
  },

  [Actions.hideInput] ({ commit }) {
    commit(Mutations.hideInput)
  }
}
