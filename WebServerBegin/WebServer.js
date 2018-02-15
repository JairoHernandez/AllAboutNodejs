'use strict';

const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');
let mimes = { 
    '.htm': 'text/html',
    '.css': 'text/css',
    '.js': 'text/javascript',
    '.gif': 'image/gif',
    '.jpg': 'image/jpeg',
    '.png': 'image/png'
};

function webserver(req, res) {
    // if the route requested is '/', then load 'index.htm' or else
    // load the requested file(s)

    let baseURI = url.parse(req.url);
    let filepath = __dirname + (baseURI.pathname === '/' ? '/index.htm' : baseURI.pathname);
    // console.log('fielpath --', filepath);

    // Check if the requested file is accesible or not.
    fs.access(filepath, fs.F_OK, error => { // Check if File is availalble.
        if (!error) {
            // Read and Serve the file over response.
            fs.readFile(filepath, (error, content) => {
                if (!error) {
                    console.log('filepath --', filepath); // /home/jairomh/WORK/AllAboutNodejs/WebServerBegin/index.htm
                    console.log('content --', content); // <Buffer 3c 21 64 6f 63 74 79 70 65 20 68 74 6d 6c 3e 0d 0a 3c 68 74 6d 6c 20 6c 61 6e 67 3d 22 65 6e 22 3e 0d 0a 3c 68 65 61 64 3e 0d 0a 20 20 20 20 3c 6d 65 ... >
                    // Resolve the content type.
                    let contentType = mimes[path.extname(filepath)]; // mimes['.css'] === 'text/css' hence result is 'text/css'
                    // Serve the file from the buffer.
                    res.writeHead(200, {'Content-type': contentType});
                    res.end(content, 'utf-8');
                } else {
                    // Server 500
                    res.writeHead(500);
                    res.end('The server could not read the file requested.');
                }
            });
        } else {
            // Server a 404
            res.writeHead(404);
            res.end('Content not found');
        }
    }); 
}

http.createServer(webserver).listen(3000, () => {
    console.log('Webserver running on port 3000.');
});