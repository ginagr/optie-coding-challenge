const http = require('http');
const fs   = require('fs');
const url  = require('url');
const port = 8080;

var server = http.createServer (function (req, res) {
	fs.readFile('index.html', function(error, content) {
		res.writeHead(200, {'Content-type': 'text/html'})
		res.end(content, 'utf-8')
	});
});

server.listen(process.env.PORT || port);
console.log('listening on http://localhost:8080');
