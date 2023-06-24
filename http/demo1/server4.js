const server = require('http');
const fs = require('fs');
const path = require('path');

// last-modified and etag
server.createServer(function(req, res) {
  console.log('request come', req.url)

  if (req.url === '/') {
    const html = fs.readFileSync(path.join(__dirname, 'demo1.html'), 'utf8');
    res.writeHead(200, {'Content-Type': 'text/html'})
    res.end(html)
  }

  if (req.url === '/script.js') {
    const etag = req.headers['if-none-match']
    if (etag === '777') {
      res.writeHead(304, {
        'Content-Type': 'text/javascript',
        'Cache-Control': 'max-age=20000, no-cache',
        // 'Cache-Control': 'max-age=20000, no-store', // no-store忽略任何与缓存相关的内容
        'Last-Modified': '123',
        'ETag': '777'
      })
      res.end('')
    } else {
      res.writeHead(200, {
        'Content-Type': 'text/javascript',
        'Cache-Control': 'max-age=20000, no-cache',
        // 'Cache-Control': 'max-age=20000, no-store', // no-store忽略任何与缓存相关的内容
        'Last-Modified': '123',
        'ETag': '777'
      })
      res.end('console.log("script loaded twice")')
    }
  }
}).listen(8888)

console.log('server started on prot 8888')