import { ActionTree } from 'vuex'
import { RootState, Actions, Mutations, ValueOf } from './types'

type ActionDefinition = {
  [K in Actions]: ValueOf<ActionTree<RootState, any>>;
}

export const actions: ActionDefinition = {
  [Actions.requestToken]({ commit }) {
    commit(Mutations.requestToken)
  },
  [Actions.setToken]({ commit }, token: string) {
    commit(Mutations.setToken, token)
  }
}
