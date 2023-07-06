const server = require('http');

server.createServer(function(req, res) {
  console.log('request come', req.url)

  // 允许跨域
  res.writeHead(200, {
    'Access-Control-Allow-Origin': '*', // * 代表任何其他服务都可以访问该资源
    // 'Access-Control-Allow-Origin': 'http://127.0.0.1:8888' // 代码允许http://127.0.0.1:8888发送跨域请求
    'Access-Control-Allow-Headers': 'X-Test-Cors', // 这里是跨域请求头限制，需要在服务器设置允许的header头，浏览器就会先往服务器发起预检请求
    'Access-Control-Allow-Methods': 'POST, PUT, Delete' ,// 设置允许的请求method
    'Access-Control-Max-Age': '1000' // 上面设置的内容，在1000s以内，不用再发起预检请求了
  })
  res.end('hello world 8887')
}).listen(8887)

console.log('server started on prot 8887')