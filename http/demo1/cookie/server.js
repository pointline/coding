const server = require('http');
const fs = require('fs');
const path = require('path');

// cookie and session
server.createServer(function(req, res) {
  console.log('request come', req.url)

  if (req.url === '/') {
    const html = fs.readFileSync(path.join(__dirname, 'cookie.html'), 'utf8');
    res.writeHead(200, {
      'Content-Type': 'text/html',
      // 'Set-Cookie': 'id=123'
      'Set-Cookie': ['id=123; max-age=2', 'abc=456; HttpOnly; domain=xulukun.cn']
    })
    res.end(html)
  }
}).listen(8888)

console.log('server started on prot 8888')