const path = require('path')
const merge = require('webpack-merge')
const webpack = require('webpack')
const nodeExternals = require('webpack-node-externals')
const baseConfig = require('./webpack.base.config.js')
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin')

module.exports = merge(baseConfig, {
  // Укажите точку входа серверной части вашего приложения
  context: path.resolve(__dirname, './'),
  entry: './entry-server.js',

  // Это позволяет Webpack обрабатывать динамические импорты в Node-стиле,
  // а также сообщает `vue-loader` генерировать серверно-ориентированный код
  // при компиляции компонентов Vue.
  target: 'node',

  // Для поддержки source map в bundle renderer
  devtool: '#source-map',

  // Это сообщает что в серверной сборке следует использовать экспорты в стиле Node
  output: {
    filename: 'server-bundle.js',
    libraryTarget: 'commonjs2'
  },

  // https://webpack.js.org/configuration/externals/#function
  // https://github.com/liady/webpack-node-externals
  // Внешние зависимости приложения. Это значительно ускоряет процесс
  // сборки серверной части и уменьшает размер итогового файла сборки.
  externals: nodeExternals({
    // не выделяйте зависимости, которые должны обрабатываться Webpack.
    // здесь вы можете добавить больше типов файлов, например сырые *.vue файлы
    // нужно также указывать белый список зависимостей изменяющих `global` (например, полифиллы)
    whitelist: /\.css$/
  }),

  // Этот плагин преобразует весь результат серверной сборки
  // в один JSON-файл. Имя по умолчанию будет
  // `vue-ssr-server-bundle.json`
  plugins: [
    new webpack.DefinePlugin({
     'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
     'process.env.VUE_ENV': '"server"'
    }),
    new VueSSRServerPlugin()
  ]
})
