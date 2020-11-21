import { Module } from 'vuex'
import { getters } from './getters'
import { actions } from './actions'
import { mutations } from './mutations'
import { PopupState, emptyState } from './types'
import { RootState } from '@/store/types'

export const state: PopupState = emptyState()

export const popupNamespace = 'popup'

const namespaced = true

export const popup: Module<PopupState, RootState> = {
    namespaced,
    state,
    getters,
    actions,
    mutations
}
