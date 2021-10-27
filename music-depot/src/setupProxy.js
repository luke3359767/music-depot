const { createProxyMiddleware } = require('http-proxy-middleware');

console.log('port on 5000')
module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://10.118.0.2:5000',
      changeOrigin: true,
    })
  );
};
