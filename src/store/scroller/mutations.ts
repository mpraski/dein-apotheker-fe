import { MutationTree } from 'vuex'
import { ScrollerState, emptyState, Mutations } from './types'
import { ValueOf } from '@/store/types'

type MutationDefinition = {
  [K in Mutations]: ValueOf<MutationTree<ScrollerState>>;
}

export const mutations: MutationDefinition = {
  [Mutations.allocate](state, increment: number) {
    const { height, scrollerHeight, contentHeight } = state

    if (!height) {
      state.height = scrollerHeight - increment
      return
    }

    let inc: number

    if (height > scrollerHeight) {
      const diff = height - contentHeight
      inc = diff < increment ? increment - diff : 0
    } else {
      const diff = contentHeight - height
      inc = diff > 0 ? increment + diff : 0
    }

    state.height += inc
  },
  [Mutations.measure](state, [scrollerHeight, contentHeight]: [number, number]) {
    state.scrollerHeight = scrollerHeight
    state.contentHeight = contentHeight
  },
  [Mutations.clear](state) {
    Object.assign(state, emptyState())
  }
}
