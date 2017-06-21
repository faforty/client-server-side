const fs = require('fs')
const express = require('express')
const path = require('path')
const webpack = require('webpack')
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

const bundle = require('../dist/vue-ssr-server-bundle.json')
const clientManifest = require('../dist/vue-ssr-client-manifest.json')

// if (project.env === 'development') {
  logger.info('Enabling webpack development and HMR middleware')

  const renderer = createBundleRenderer(bundle, {
    template: fs.readFileSync(path.join(__dirname, '../src/index.html'), 'utf-8'),
    // basedir: path.join(__dirname, '../dist'),
    clientManifest
  })

  app.get('*', (req, res) => {
    const context = { title: 'Vue HN 2.0', url: req.url }
    // Нет необходимости передавать приложение здесь, потому что оно автоматически создаётся
    // при выполнении сборки. Теперь наш сервер отделён от нашего приложения Vue!
    renderer.renderToString(context, (err, html) => {
      if (err) {
        console.log(err)
      }

      res.end(html)
    })
  })

  // Serve static assets from ~/public since Webpack is unaware of
  // these files. This middleware doesn't need to be enabled outside
  // of development since this directory will be copied into ~/dist
  // when the application is compiled.


// } else {
//   logger.warn(
//     'Server is being run outside of live development mode, meaning it will ' +
//     'only serve the compiled application bundle in ~/dist. Generally you ' +
//     'do not need an application server for this and can instead use a web ' +
//     'server such as nginx to serve your static files. See the "deployment" ' +
//     'section in the README for more information on deployment strategies.'
//   )
//
//   // Serving ~/dist by default. Ideally these files should be served by
//   // the web server and not the app server, but this helps to demo the
//   // server in production.
//   app.use(express.static(path.resolve(project.basePath, project.outDir)))
// }

// app.use('/dist', serve(path.join(__dirname, '../dist'), true))

module.exports = app
