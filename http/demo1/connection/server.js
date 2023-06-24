const server = require('http');
const fs = require('fs');
const path = require('path');

// keep alive
server.createServer(function(req, res) {
  console.log('request come', req.url)

  const html = fs.readFileSync(path.join(__dirname, 'demo1.html'), 'utf8');
  const img = fs.readFileSync(path.join(__dirname, '1.jpg'));
  if (req.url === '/') {
    res.writeHead(200, {
      'Content-Type': 'text/html',
      'Connection': 'close' // keep-alive
    })
    res.end(html)
  } else {
    res.writeHead(200, {
      'Content-Type': 'image/jpg',
      'Connection': 'close' // keep-alive
    })
    res.end(img)
  }
}).listen(8888)

console.log('server started on prot 8888')