module.exports = {
  publicPath: './',
  devServer: {
    proxy: {
      '/web': {
        target: 'https://test-api.baijiayun.com',
        changeOrigin: true,
        pathRewrite: {
          '^/web': '/web'
        }
      }
    }
  }
}
