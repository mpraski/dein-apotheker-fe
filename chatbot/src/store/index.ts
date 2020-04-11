import Vue from 'vue'
import Vuex, { StoreOptions } from 'vuex'
import { RootState } from './types'
import { message } from './message'
import { input } from './input'
import { answer } from './answer'

Vue.use(Vuex)

const store: StoreOptions<RootState> = {
  state: {
    version: '1.0.0'
  },
  modules: {
    message,
    input,
    answer
  }
}

export default new Vuex.Store<RootState>(store)
