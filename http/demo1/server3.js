const server = require('http');
const fs = require('fs');
const path = require('path');

// cache-control
server.createServer(function(req, res) {
  console.log('request come', req.url)

  if (req.url === '/') {
    const html = fs.readFileSync(path.join(__dirname, 'demo1.html'), 'utf8');
    res.writeHead(200, {'Content-Type': 'text/html'})
    res.end(html)
  }

  if (req.url === '/script.js') {
    res.writeHead(200, {
      'Content-Type': 'text/javascript',
      'Cache-Control': 'max-age=200'
    })
    res.end('console.log("script loaded twice")')
  }
}).listen(8888)

console.log('server started on prot 8888')