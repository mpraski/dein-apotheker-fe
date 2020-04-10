import { Module } from 'vuex'
import { getters } from './getters'
import { actions } from './actions'
import { mutations } from './mutations'
import { MessageState } from './types'
import { RootState } from '@/store/types'

export const state: MessageState = []

const namespaced = true

export const message: Module<MessageState, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations
}
