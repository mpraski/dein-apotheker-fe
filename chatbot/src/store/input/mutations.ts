import { MutationTree } from 'vuex'
import { InputState, Input, Mutations } from './types'
import { ValueOf } from '@/store/types'

type MutationDefinition = {
  [K in Mutations]: ValueOf<MutationTree<InputState>>;
}

export const mutations: MutationDefinition = {
  [Mutations.showInput] (state, input: Input) {
    state.input = input
    state.show = true
  },
  [Mutations.hideInput] (state) {
    state.show = false
  }
}
