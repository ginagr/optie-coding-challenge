const http = require('http');
const fs   = require('fs');
const url  = require('url');
const port = 8080;

var server = http.createServer (function (req, res) {
	var path = url.parse(req.url).pathname;
	switch (path) {
		case '/':
		case '/index.html':
			read('index.html', res, 'text/html');
		case '/style.css':
			read('style.css', res, 'text/css');
		case '/scripts.js':
			read('scripts.js', res, 'text/javascript');
	}
});

function read(path, res, contentType) {
	fs.readFile(path, function(error, content) {
		res.writeHead(200, {'Content-type': contentType})
		res.end(content, 'utf-8')
	});
}

server.listen(process.env.PORT || port);
console.log('listening on http://localhost:8080');