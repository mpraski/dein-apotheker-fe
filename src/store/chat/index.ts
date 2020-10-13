import { Module } from 'vuex'
import { getters } from './getters'
import { actions } from './actions'
import { mutations } from './mutations'
import { ChatState, emptyState } from './types'
import { RootState } from '@/store/types'

export const state: ChatState = emptyState()

export const chatNamespace = 'chat'

const namespaced = true

export const chat: Module<ChatState, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations
}
