import Vue from 'vue'
import { createRouter } from './router'
import { createStore } from './store'
import App from './view/App.vue'

// экспортируем функцию фабрику для создания экземпляров
// нового приложения, маршрутизатора и хранилища
export function createApp () {
  const router = createRouter()
  const store = createStore()

  const app = new Vue({
    store,
    router,
    render: h => h(App)
  })

  return { app, router, store }
}
