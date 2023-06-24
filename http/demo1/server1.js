const server = require('http');
const fs = require('fs');
const path = require('path');

server.createServer(function(req, res) {
  console.log('request come', req.url)

  const html = fs.readFileSync(path.join(__dirname, 'demo1.html'), 'utf8');
  res.writeHead(200, {'Content-Type': 'text/html'})
  res.end(html)
}).listen(8888)

console.log('server started on prot 8888')