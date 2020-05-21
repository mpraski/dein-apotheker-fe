import { Module } from 'vuex'
import { getters } from './getters'
import { actions } from './actions'
import { mutations } from './mutations'
import { InputState, InputBegin } from './types'
import { RootState } from '@/store/types'

export const state: InputState = {
  show: true,
  input: { type: 'begin' } as InputBegin,
  language: undefined,
  languages: []
}

export const inputNamespace = 'input'

const namespaced = true

export const input: Module<InputState, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations
}
