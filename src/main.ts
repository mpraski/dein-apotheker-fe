import Vue from 'vue'
import App from '@/App.vue'
import '@/registerServiceWorker'
import router from '@/router'
import { createStore } from '@/store'
import { RootState } from '@/store/types'
import { Client } from '@/client'
import { fetchToken } from '@/client/plugin'
import { registerDriver } from './driver/plugin'
import { ChatClient, SessionClient } from '@/gateway'

import { messages as en } from '@/translations/en'

import VuexPersistence from 'vuex-persist'
import VueI18n from 'vue-i18n'
import 'typeface-roboto/index.css'
import 'vue-material-design-icons/styles.css'

Vue.config.productionTip = false

Vue.use(VueI18n)

const client = new Client(process.env.VUE_APP_API_ROOT)
const chat = new ChatClient(client)
const session = new SessionClient(client)
const vuexSession = new VuexPersistence<RootState>({
  storage: window.sessionStorage
})

const store = createStore(
  vuexSession.plugin,
  fetchToken(client),
  registerDriver(chat, session)
)

// Create VueI18n instance with options
const i18n = new VueI18n({
  locale: 'en',
  messages: { en }
})

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')