const Vue = require('vue')
const app = new Vue({
  template: `<div>Hello World</div>`
})

// Шаг 2: Создаём рендерер
const renderer = require('vue-server-renderer').createRenderer()

// Шаг 3: Рендерим экземпляр Vue в HTML
renderer.renderToString(app, (err, html) => {
  if (err) throw err
  console.log(html)
// => <div data-server-rendered="true">hello world</div>
})