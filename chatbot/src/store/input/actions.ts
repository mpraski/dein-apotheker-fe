import { ActionTree } from 'vuex'
import { InputState, Input, Actions, Mutations } from './types'
import { RootState, ValueOf } from '@/store/types'

type ActionDefinition = {
  [K in Actions]: ValueOf<ActionTree<InputState, RootState>>;
}

export const actions: ActionDefinition = {
  [Actions.showInput] ({ commit }): any {
    commit(Mutations.showInput, {
      type: 'INPUT_PROMPT'
    } as Input)
  },

  [Actions.hideInput] ({ commit }): any {
    commit(Mutations.hideInput)
  }
}
