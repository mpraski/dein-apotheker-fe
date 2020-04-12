import { ActionTree } from 'vuex'
import { Token, RootState, Actions, Mutations, ValueOf } from './types'

type ActionDefinition = {
  [K in Actions]: ValueOf<ActionTree<RootState, any>>;
}

export const actions: ActionDefinition = {
  [Actions.provideToken] ({ commit }, payload: Token): any {
    commit(Mutations.provideToken, payload)
  }
}
