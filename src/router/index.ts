import VueRouter, {createRouter} from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    component: Home
  }
]

const router = createRouter({
  history: VueRouter.createWebHashHistory(),
  routes
})

export default router
