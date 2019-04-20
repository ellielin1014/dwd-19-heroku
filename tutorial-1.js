let http = require('http');
let port = process.env.PORT || 8000;

// Make a web server
http.createServer(function (req, res) {
  console.log(req);

  res.writeHead(200);

  res.end('Hello world!', req);
}).listen(port);

console.log('Server listening on port: ', port);
