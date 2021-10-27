const { createProxyMiddleware } = require('http-proxy-middleware');

console.log('port on 5000')
module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:5000',
      changeOrigin: true,
    })
  );
};
