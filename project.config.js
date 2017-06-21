const NODE_ENV = process.env.NODE_ENV || 'development'

module.exports = {
  env: NODE_ENV,
  basePath: __dirname,
  publicPath: '/',
  srcDir: 'src',
  outDir: 'dist',
  port: 9000,
  autoprefixer: ['last 5 versions']
}
