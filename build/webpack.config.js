const path = require('path')

module.exports = {
  context: path.resolve(__dirname, './src'),
  entry: {
    app: './app.js',
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, './dist/'),
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
    ],
  },
  resolve: {
    modules: [path.resolve(__dirname, './src'), 'node_modules'],
  }
}
