import { ActionTree } from 'vuex'
import { ScrollerState, Actions, Mutations } from './types'
import { RootState, ValueOf } from '@/store/types'

type ActionDefinition = {
  [K in Actions]: ValueOf<ActionTree<ScrollerState, RootState>>;
}

export const actions: ActionDefinition = {
  [Actions.allocate]({ commit }, increment: number) {
    commit(Mutations.allocate, increment)
  },
  [Actions.measure]({ commit }, height: number) {
    commit(Mutations.measure, height)
  },
  [Actions.clear]({ commit }) {
    commit(Mutations.clear)
  }
}
