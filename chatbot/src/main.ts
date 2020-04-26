import Vue from 'vue'
import App from '@/App.vue'
import '@/registerServiceWorker'
import router from '@/router'
import { createStore } from '@/store'
import { RootState, Token, Actions } from '@/store/types'
import { Client } from '@/client'
import { Gateway } from '@/gateway'
import { Driver } from '@/driver'

import VuexPersistence from 'vuex-persist'
import 'typeface-roboto/index.css'
import 'vue-material-design-icons/styles.css'

Vue.config.productionTip = false

const vuexSession = new VuexPersistence<RootState>({
  storage: window.sessionStorage
})

const store = createStore(
  vuexSession.plugin,
  Driver.plugin(
    new Gateway(new Client(process.env.VUE_APP_API_ROOT))
  )
)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
