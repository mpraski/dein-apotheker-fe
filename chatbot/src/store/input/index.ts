import { Module } from 'vuex'
import { getters } from './getters'
import { actions } from './actions'
import { mutations } from './mutations'
import { InputState } from './types'
import { RootState } from '@/store/types'

export const state: InputState = {
  show: false,
  input: undefined
}

const namespaced = true

export const input: Module<InputState, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations
}
