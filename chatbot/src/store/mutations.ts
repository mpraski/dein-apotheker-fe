import { MutationTree } from 'vuex'
import { Token, RootState, Mutations, ValueOf } from './types'

type MutationDefinition = {
    [K in Mutations]: ValueOf<MutationTree<RootState>>;
}

export const mutations: MutationDefinition = {
  [Mutations.provideToken] (state, token: Token) {
    state.token = token
  }
}
