const { resolve } = require('path');
module.exports = {
  chainWebpack: config => {
    config.resolve.alias.set('assets', resolve('src/assets'));
    config.resolve.symlinks(true);
  },
  devServer: {
    host: 'localhost',
    port: 8080,
    proxy: {
      '/api': {
        target: 'https://c.y.qq.com',
        ws: true,
        changOrigin: true,
        pathRewrite: {
          '^/api': ''
        },
        bypass: function(req, res, proxyOptions) {
          req.headers.referer = 'https://c.y.qq.com/';
          req.headers.host = 'c.y.qq.com';
        }
      },
      '/qqsong': {
        target: 'https://u.y.qq.com',
        ws: true,
        changOrigin: true,
        pathRewrite: {
          '^/qqsong': ''
        },
        bypass: function(req, res, proxyOptions) {
          req.headers.referer = 'https://y.qq.com/';
          req.headers.host = 'https://y.qq.com';
          req.headers['Content-type'] = 'application/x-www-form-urlencoded';
        }
      }
    }
  }
};
