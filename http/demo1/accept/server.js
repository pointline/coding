const server = require('http');
const fs = require('fs');
const path = require('path');
const zlib = require('zlib')

// accept
server.createServer(function(req, res) {
  console.log('request come', req.url)

  const html = fs.readFileSync(path.join(__dirname, 'demo1.html'));
  res.writeHead(200, {
    'Content-Type': 'text/html',
    // 'X-Content-Type-Options': 'nosniff' // 很早IE浏览器，会自动错误识别返回的类型，或者在没声明Content-Type时，自动默认加上了一个Content-Type，导致安全信息被泄漏。声明这个属性就不会自动去预测他
    'Content-Encoding': 'gzip' // 压缩方式
  })
  res.end(zlib.gzipSync(html)) // 使用后由438B大小减少到393B，减少网络开销
}).listen(8888)

console.log('server started on prot 8888')