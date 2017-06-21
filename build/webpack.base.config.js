const path = require('path')
const webpack = require('webpack')
const project = require('../project.config')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const __DEV__ = project.env === 'development'
const __PROD__ = project.env === 'production'

const config = {
  devtool: __DEV__ ? false : '#cheap-module-source-map',
  output: {
    filename: __DEV__ ? '[name].bundle.js' : '[name].[chunkhash].js',
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: ['vue-loader'],
      }, {
        test: /\.js$/,
        use: ['babel-loader'],
        exclude: /node_modules/,
      },
      // {
      //   test: /\.styl$/,
      //   use: [
      //     'style-loader',
      //     'css-loader',
      //     {
      //       loader: 'stylus-loader',
      //       options: {
      //         use: [
      //           require('autoprefixer-stylus')(project.autoprefixer),
      //         ],
      //       },
      //     },
      //   ],
      // },
      {
        test: /\.styl$/,
        use: ExtractTextPlugin.extract({
          fallback: 'vue-style-loader',
          use: ['css-loader', 'stylus-loader']
        })
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.vue', '.styl', '.json'],
    alias: {
      'src': path.resolve(project.basePath, 'src'),
    },
    modules: [
      path.resolve(project.basePath, './src'),
      'node_modules'
    ],
  },
  performance: {
    maxEntrypointSize: 300000,
    hints: __PROD__ ? 'warning' : false
  },
  plugins: []
}

if (__DEV__) {
  config.plugins.push(
    // new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin()
  )
}

if (__PROD__) {
  config.plugins.push(
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false,
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: !!config.devtool,
      comments: false,
      compress: {
        warnings: false,
        screw_ie8: true,
        conditionals: true,
        unused: true,
        comparisons: true,
        sequences: true,
        dead_code: true,
        evaluate: true,
        if_return: true,
        join_vars: true,
      },
    }),
    new ExtractTextPlugin({
      filename: 'common.[chunkhash].css'
    })
  )
}

module.exports = config
