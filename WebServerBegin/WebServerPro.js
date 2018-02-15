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

function fileAccess(filepath) {
    return new Promise((resolve, reject) => {
        fs.access(filepath, fs.F_OK, error => {
            if (!error) {
                resolve(filepath); // care about resolving filepath
            } else {
                reject(error); // so it can be caught.
            }
        });
    });
}

function fileReader(filepath) {
    return new Promise((resolve, reject) => {
        fs.readFile(filepath, (error, content) => {
            if (!error) {
                resolve(content); // care about resolving content.
            } else {
                reject(error);
            }
        })
    });
}

function webserver(req, res) {
    // if the route requested is '/', then load 'index.htm' or else
    // load the requested file(s)

    let baseURI = url.parse(req.url);
    let filepath = __dirname + (baseURI.pathname === '/' ? '/index.htm' : baseURI.pathname);
    // console.log('fielpath --', filepath);
    let contentType = mimes[path.extname(filepath)]; // mimes['.css'] === 'text/css' hence result is 'text/css'

    // Check if the requested file is accesible or not.

    fileAccess(filepath) // filepath returned in the resolve of function fileAccess is passed down to fileReader.
        .then(fileReader)
        .then(content => {
            console.log('content --', content); // <Buffer 3c 21 64 6f 63 74 79 70 65 20 68 74 6d 6c 3e 0d 0a 3c 68 74 6d 6c 20 6c 61 6e 67 3d 22 65 6e 22 3e 0d 0a 3c 68 65 61 64 3e 0d 0a 20 20 20 20 3c 6d 65 ... >
            res.writeHead(200, {'Content-type': contentType});
            res.end(content, 'utf-8');
        })
        .catch(error => {
            console.log(error);
            res.writeHead(404);
            res.end(JSON.stringify(error));
        });
}

http.createServer(webserver).listen(3000, () => console.log('Webserver running on port 3000.'));