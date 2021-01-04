import Vue from 'vue'
import Vuex, { Store, StoreOptions, Plugin } from 'vuex'
import { RootState } from './types'
import { getters } from './getters'
import { actions } from './actions'
import { mutations } from './mutations'
import { popup } from './popup'
import { chat } from './chat'

Vue.use(Vuex)

export const createStore = (...plugins: Array<Plugin<RootState>>): Store<RootState> => {
  const state = {
    token: undefined
  } as RootState

  const modules = {
    chat,
    popup
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
