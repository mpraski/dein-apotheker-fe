import { ActionTree } from 'vuex'
import { CartState, Product, Actions, Mutations } from './types'
import { RootState, ValueOf } from '@/store/types'

type ActionDefinition = {
  [K in Actions]: ValueOf<ActionTree<CartState, RootState>>;
}

export const actions: ActionDefinition = {
  [Actions.add] ({ commit }, payload: Product) {
    commit(Mutations.add, payload)
  },

  [Actions.remove] ({ commit }, id: string) {
    commit(Mutations.remove, id)
  }
}
