const server = require('http');

server.createServer(function(req, res) {
  console.log('request come', req.url)

  if (req.url === '/') {
    res.writeHead(302, { // 302的语义是临时跳转，301是永久跳转
      'Location': '/new'
    })
    res.end('')
  }

  if (req.url === '/new') {
    res.writeHead(200, {'Content-Type': 'text/html'})
    res.end('<div>this is context</div>')
  }


}).listen(8888)

console.log('server started on prot 8888')