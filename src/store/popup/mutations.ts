import { MutationTree } from 'vuex'
import { PopupState, Mutations, PopupKey } from './types'
import { ValueOf } from '@/store/types'
import { Vue } from 'vue-property-decorator'

type MutationDefinition = {
  [K in Mutations]: ValueOf<MutationTree<PopupState>>;
}

export const mutations: MutationDefinition = {
  [Mutations.showPopup](state, payload: [PopupKey, any]) {
    Vue.set(state, payload[0], payload[1])
  },
  [Mutations.hidePopup](state, payload: PopupKey) {
    Vue.delete(state, payload)
  },
  [Mutations.clear](state) {
    for (const [k, _] of Object.entries(state)) {
      Vue.delete(state, k)
    }
  }
}
