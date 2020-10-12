import { MutationTree } from 'vuex'
import { CartState, Mutations, Product } from './types'
import { ValueOf } from '@/store/types'

import { Vue } from 'vue-property-decorator'

type MutationDefinition = {
  [K in Mutations]: ValueOf<MutationTree<CartState>>;
}

export const mutations: MutationDefinition = {
  [Mutations.add] (state, product: Product) {
    let i = 0
    for (; i < state.length; i++) {
      const [p, c] = state[i]

      if (p.id === product.id) {
        Vue.set(state, i, [p, c + 1])
        break
      }
    }

    if (i === state.length) {
      state.push([product, 1])
    }
  },
  [Mutations.remove] (state, id: string) {
    for (let i = state.length; i--;) {
      const [p, c] = state[i]

      if (p.id !== id) {
        continue
      }

      if (c - 1 === 0) {
        state.splice(i, 1)
      } else {
        Vue.set(state, i, [p, c - 1])
      }
    }
  }
}
