const server = require('http');
const fs = require('fs');
const path = require('path');

// csp
server.createServer(function(req, res) {
  console.log('request come', req.url)

  if (req.url === '/') {
    const html = fs.readFileSync(path.join(__dirname, 'demo.html'), 'utf8');
    res.writeHead(200, {
      'Content-Type': 'text/html',
      // 'Content-Security-Policy': 'default-src http: https:' // 全局控制只能运行http或着https加载的资源，不允许使用inline的内容
      // 'Content-Security-Policy': 'default-src \'self\' https://cdn.bootcdn.net/' // 'self'限制只加载本站域名下的内容，也可以直接加载指定域名内容
      // 'Content-Security-Policy': 'default-src \'self\'; form-action \'self\'' // 通过form-action限制表单只能提交到本站点
      // 'Content-Security-Policy': 'script-src \'self\';' // 只限制加载本站点脚本内容，这样图片资源是可以加载的
      // 'Content-Security-Policy': 'script-src \'self\'; report-uri /report' // 当发生CSP错误时，将信息上报给report-uri
      // 'Content-Security-Policy-Report-Only': 'script-src \'self\'; report-uri /report' // Content-Security-Policy-Report-Only 会有上报动作，但不限制资源加载
    })
    res.end(html)
  }

  if (req.url === '/test.js') {
    res.writeHead(200, {
      'Content-Type': 'application/javascript'
    })
    res.end('console.log("test")')
  }
}).listen(8888)

console.log('server started on prot 8888')