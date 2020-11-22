import { ActionTree } from 'vuex'
import { PopupState, Actions, Mutations, PopupKey } from './types'
import { RootState, ValueOf } from '@/store/types'

type ActionDefinition = {
  [K in Actions]: ValueOf<ActionTree<PopupState, RootState>>;
}

export const actions: ActionDefinition = {
  [Actions.showPopup]({ commit }, payload: [PopupKey, any]) {
    commit(Mutations.showPopup, payload)
  },
  [Actions.hidePopup]({ commit }, payload: PopupKey) {
    commit(Mutations.hidePopup, payload)
  }
}
