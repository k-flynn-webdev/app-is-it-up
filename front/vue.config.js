process.env.VUE_APP_VERSION = require('./package.json').version
process.env.VUE_APP_NAME = require('./package.json').name

module.exports = {
  devServer: {
    host: '127.0.0.1',
    port: 8080,
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8600',
        ws: true,
        changeOrigin: true
      },
      // '/user/verify': {
      //   target: 'http://127.0.0.1:8600',
      //   ws: true,
      //   changeOrigin: true
      // }
    }
  }
}
