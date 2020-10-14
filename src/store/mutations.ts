import { MutationTree } from 'vuex'
import { RootState, Mutations, ValueOf } from './types'

type MutationDefinition = {
  [K in Mutations]: ValueOf<MutationTree<RootState>>;
}

export const mutations: MutationDefinition = {
  [Mutations.requestToken](state) {
    state.token = undefined
  },
  [Mutations.setToken](state, token: string) {
    state.token = token
  }
}
