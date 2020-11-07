import { ActionTree } from 'vuex'
import { RootState, Actions, Mutations, ValueOf, computeScreenSize } from './types'

type ActionDefinition = {
  [K in Actions]: ValueOf<ActionTree<RootState, any>>;
}

export const actions: ActionDefinition = {
  [Mutations.requestSession]({ commit }) {
    commit(Mutations.requestSession)
  },
  [Actions.receiveSession]({ commit }, token: string) {
    commit(Mutations.receiveSession, token)
  },
  [Actions.setToken]({ commit }, token: string) {
    commit(Mutations.setToken, token)
  },
  [Actions.computeScreen]({ commit }) {
    commit(Mutations.setScreen, computeScreenSize())
  }
}
