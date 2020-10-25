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
  [Actions.measure]({ commit }, data: [number, number]) {
    commit(Mutations.measure, data)
  },
  [Actions.revert]({ commit }, height: number) {
    commit(Mutations.revert, height)
  },
  [Actions.clear]({ commit }) {
    commit(Mutations.clear)
  }
}
