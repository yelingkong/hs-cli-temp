module.exports = {
  chainWebpack (config) {
    const scss = config.module.rule('scss').toConfig()
    const useable = { ...scss.oneOf[3], test: /\.theme\.scss/ }
    useable.use = [...useable.use]
    useable.use[0] = { loader: 'style-loader/useable' }
    config.module.rule('scss').merge({ oneOf: [useable] })
  },
  devServer: {
    proxy: {
      '^/api': {
        target: 'http://192.168.13.13:8080/',
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
}
