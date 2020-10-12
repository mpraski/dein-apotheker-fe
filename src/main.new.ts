import Vue from 'vue'
import App from '@/App.vue'
import '@/registerServiceWorker'
import router from '@/router'
import { createStore } from '@/store'
import { RootState } from '@/store/types'
import { Client } from '@/client'
import { Gateway } from '@/gateway'
import { Driver } from '@/driver'

import { messages as en } from '@/translations/en'

import VuexPersistence from 'vuex-persist'
import VueI18n from 'vue-i18n'
import 'typeface-roboto/index.css'
import 'vue-material-design-icons/styles.css'


const vuexSession = new VuexPersistence<RootState>({
  storage: window.sessionStorage
})

const store = createStore(
  // vuexSession.plugin,
  Driver.plugin(
    new Gateway(new Client(process.env.VUE_APP_API_ROOT))
  )
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
