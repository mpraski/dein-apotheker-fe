import { MutationTree } from 'vuex'
import { PopupState, Mutations, PopupKey } from './types'
import { ValueOf } from '@/store/types'

type MutationDefinition = {
  [K in Mutations]: ValueOf<MutationTree<PopupState>>;
}

export const mutations: MutationDefinition = {
  [Mutations.showPopup] (state, payload: [PopupKey, any]) {
    state[payload[0]] = payload[1]
  },
  [Mutations.hidePopup] (state, payload: PopupKey) {
    state[payload] = undefined
  }
}
