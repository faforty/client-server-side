const fs = require('fs')
const express = require('express')
const path = require('path')
const project = require('../project.config')
const logger = require('../build/lib/logger')
const compress = require('compression')
const { createBundleRenderer } = require('vue-server-renderer')

const __DEV__ = project.env === 'development'
const __PROD__ = project.env === 'production'

const app = express()
const serve = (path, cache) => express.static(path, {
  maxAge: cache && __PROD__ ? 1000 * 60 * 60 * 24 * 30 : 0
})

app.use(compress())
app.use(express.static(path.resolve(project.basePath, 'public')))
app.use(serve(path.resolve(project.basePath, project.outDir)))

const template = fs.readFileSync(path.join(__dirname, '../src/index.html'), 'utf-8')

let renderer = null

if (__PROD__) {
  const bundle = require('../dist/vue-ssr-server-bundle.json')
  const clientManifest = require('../dist/vue-ssr-client-manifest.json')

  renderer = createBundleRenderer(bundle, {
    template,
    clientManifest
  })
}

if (__DEV__) {
  logger.info('Enabling webpack development and HMR middleware')

  require('../build/setup-dev-server')(app, (bundle, options) => {
    renderer = createBundleRenderer(bundle, Object.assign(options, {
      template
    }))
  })
}

app.get('*', (req, res) => {
  const s = Date.now()
  const context = { title: 'Vue HN 2.0', url: req.url }
  // Нет необходимости передавать приложение здесь, потому что оно автоматически создаётся
  // при выполнении сборки. Теперь наш сервер отделён от нашего приложения Vue!
  renderer.renderToString(context, (err, html) => {
    if (err) {
      console.log(err)
    }

    res.end(html)

    if (__DEV__) {
      console.log(`whole request: ${Date.now() - s}ms`)
    }
  })
})

module.exports = app
