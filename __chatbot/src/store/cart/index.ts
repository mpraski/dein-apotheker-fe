import { Module } from 'vuex'
import { getters } from './getters'
import { actions } from './actions'
import { mutations } from './mutations'
import { CartState } from './types'
import { RootState } from '@/store/types'

export const state: CartState = []

export const cartNamespace = 'cart'

const namespaced = true

export const cart: Module<CartState, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations
}
