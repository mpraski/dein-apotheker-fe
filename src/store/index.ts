import Vue from 'vue'
import Vuex, { Store, StoreOptions, Plugin } from 'vuex'
import { RootState } from './types'
import { getters } from './getters'
import { actions } from './actions'
import { mutations } from './mutations'
import { message } from './message'
import { input } from './input'
import { answer } from './answer'
import { popup } from './popup'
import { cart } from './cart'

Vue.use(Vuex)

export const createStore = (...plugins: Array<Plugin<RootState>>): Store<RootState> => {
  const state = {
    token: undefined
  } as RootState

  const modules = {
    message,
    input,
    answer,
    popup,
    cart
  }

  const store: StoreOptions<RootState> = {
    state,
    getters,
    actions,
    mutations,
    modules,
    plugins
  }

  return new Vuex.Store<RootState>(store)
}
