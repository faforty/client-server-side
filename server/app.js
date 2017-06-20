const express = require('express')
const path = require('path')
const webpack = require('webpack')
const project = require('../project.config')
const logger = require('../build/lib/logger')
const compress = require('compression')

const createApp = require('../src/app')
const renderer = require('vue-server-renderer').createRenderer()

const serve = express()
serve.use(compress())

if (project.env === 'development') {
  // const compiler = webpack(webpackConfig)

  logger.info('Enabling webpack development and HMR middleware')

  // app.use(require('webpack-dev-middleware')(compiler, {
  //   publicPath  : webpackConfig.output.publicPath,
  //   contentBase : path.resolve(project.basePath, project.srcDir),
  //   hot         : true,
  //   quiet       : false,
  //   noInfo      : false,
  //   lazy        : false,
  //   stats       : 'normal',
  // }))
  // app.use(require('webpack-hot-middleware')(compiler, {
  //   path: '/__webpack_hmr'
  // }))

  serve.get('*', (req, res) => {
    const context = { url: req.url }
    const app = createApp(context)

    renderer.renderToString(app, (err, html) => {
      // обработка ошибок...
      res.end(html)
    })
  })

  // Serve static assets from ~/public since Webpack is unaware of
  // these files. This middleware doesn't need to be enabled outside
  // of development since this directory will be copied into ~/dist
  // when the application is compiled.
  serve.use(express.static(path.resolve(project.basePath, 'public')))
} else {
  logger.warn(
    'Server is being run outside of live development mode, meaning it will ' +
    'only serve the compiled application bundle in ~/dist. Generally you ' +
    'do not need an application server for this and can instead use a web ' +
    'server such as nginx to serve your static files. See the "deployment" ' +
    'section in the README for more information on deployment strategies.'
  )

  // Serving ~/dist by default. Ideally these files should be served by
  // the web server and not the app server, but this helps to demo the
  // server in production.
  serve.use(express.static(path.resolve(project.basePath, project.outDir)))
}

module.exports = serve
