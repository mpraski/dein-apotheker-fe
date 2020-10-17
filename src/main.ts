import Vue from 'vue'
import Chat from '@/views/Chat.vue'

import { RootState } from '@/store/types'
import { Client } from '@/client'
import { createStore } from '@/store'
import { fetchToken } from '@/client/plugin'
import { registerDriver } from './driver/plugin'
import { ChatClient, SessionClient } from '@/gateway'

import { messages as en } from '@/translations/en'

import VuexPersistence from 'vuex-persist'
import VueI18n from 'vue-i18n'
import 'vue-material-design-icons/styles.css'
import '@/registerServiceWorker'
import { Driver } from './driver'

Vue.config.productionTip = false

Vue.use(VueI18n)

const client = new Client(process.env.VUE_APP_API_ROOT)
const chat = new ChatClient(client)
const session = new SessionClient(client)
const driver = new Driver(chat, session)
const vuexSession = new VuexPersistence<RootState>({
  storage: window.sessionStorage
})

Vue.prototype.$driver = driver

const store = createStore(
  vuexSession.plugin,
  fetchToken(client),
  registerDriver(driver)
)

// Create VueI18n instance with options
const i18n = new VueI18n({
  locale: 'en',
  messages: { en }
})

new Vue({
  store,
  i18n,
  render: h => h(Chat)
}).$mount('#app')
