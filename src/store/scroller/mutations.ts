import { MutationTree } from 'vuex'
import { ScrollerState, emptyState, Mutations } from './types'
import { ValueOf } from '@/store/types'

type MutationDefinition = {
  [K in Mutations]: ValueOf<MutationTree<ScrollerState>>;
}

export const mutations: MutationDefinition = {
  [Mutations.allocate](state, increment: number) {
    if (!state.height) {
      state.height += increment
    } else {
      const diff = state.height - state.contentHeight
      const inc = diff > 0 ? increment - diff : increment

      state.height += inc
    }
  },
  [Mutations.measure](state, height: number) {
    state.contentHeight = height
  },
  [Mutations.clear](state) {
    Object.assign(state, emptyState())
  }
}
