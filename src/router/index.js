import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const routes = [
  {
    name: 'home',
    path: '',
    component: require('../view/Home.vue'),
  }
]

const router = new Router({
  mode: 'history',
  routes,
})

export function createRouter () {
  return router
}
