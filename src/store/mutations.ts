import { MutationTree } from 'vuex'
import { RootState, Mutations, ValueOf } from './types'

type MutationDefinition = {
  [K in Mutations]: ValueOf<MutationTree<RootState>>;
}

export const mutations: MutationDefinition = {
  [Mutations.requestSession](state) {
    state.token = undefined
  },
  [Mutations.receiveSession](state, token: string) {
    state.token = token
  },
  [Mutations.setToken](state, token: string) {
    state.token = token
  }
}
