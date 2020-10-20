import { Module } from 'vuex'
import { getters } from './getters'
import { actions } from './actions'
import { mutations } from './mutations'
import { ScrollerState, emptyState } from './types'
import { RootState } from '@/store/types'

export const state: ScrollerState = emptyState()

export const scrollerNamespace = 'scroller'

const namespaced = true

export const scroller: Module<ScrollerState, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations
}
