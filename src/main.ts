import { createApp } from 'vue'
import { createStore } from './store'
import App from './App.vue'

import 'typeface-roboto/index.css';

const app = createApp(App)

app.use(createStore())

app.mount('#app')