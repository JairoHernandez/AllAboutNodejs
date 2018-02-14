'use strict';

const http = require('http');

http.createServer((req, res) => {
    res.writeHead(200, {'Content-type': 'text/html'}); // Will put in web response Header.
    res.end('<h1>Hello NodeJS</h1>');

}).listen(3000, () => console.log('Server running on port 3000.'));