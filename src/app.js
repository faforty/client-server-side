const Vue = require('vue')
const App = require('./view/App.vue')

// экспортируем функцию фабрику для создания экземпляров
// нового приложения, маршрутизатора и хранилища
export function createApp () {
  const app = new Vue({
    // корневой экземпляр просто рендерит компонент App
    render: h => h(App)
  })
  return { app }
}
