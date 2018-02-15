'use strict';

const http = require('http');
const url = require('url');
const qs = require('querystring'); // Contains a parse method similar to url.

let routes = {
    'GET': {
        '/': (req, res) => {
            res.writeHead(200, {'Content-type': 'text/html'});
            res.end('<h1>Hello Router root.</h1>');
        },
        '/about': (req, res) => {
            res.writeHead(200, {'Content-type': 'text/html'});
            res.end('<h1>This is the About page.</h1>')
        },
        '/api/getinfo': (req, res) => {
            res.writeHead(200, {'Content-type': 'application/json'});
            res.end(JSON.stringify(req.queryParams));
        }
    },
    'POST': {
        '/api/login': (req, res) => {
            let body = ''; // bucket storing data as it flows in from user.
            req.on('data', data => { // event listener listening for specific event called 'data'
                body += data;
                console.log('body length --', body.length);
                if (body.length > 2097152) {
                    res.writeHead(413, {'Content-type': 'text/html'});
                    res.end('<h3>Error: the file being uploaded exceeds the 2MB limit</h3>', () => req.connection.destroy());
                } 
            }); 

            req.on('end', () => {
                // console.log('POST body --',body); // username=johndow&password=mrrobot
                let params = qs.parse(body);
                console.log('Username:', params['username']);
                console.log('Password:', params['password']);
                // Query a db to see if the user exists.
                // If so , send a JSON response to the SPA.
                res.end();
            });
        }
    },
    'NA': (req, res) => {
        res.writeHead(404);
        res.end('Content not found!');
    }
};

function router(req, res) {
    let baseURI = url.parse(req.url, true);
    // console.log('REQ -- ', req);
    // console.log('Request route -- ', baseURI);
    let resolveRoute = routes[req.method][baseURI.pathname]; // where [baseURI.pathname] equates to /
    if (resolveRoute != undefined) {
        req.queryParams = baseURI.query;
        // console.log('req.queryParams --', req.queryParams);
        // console.log('resolveRoute -- ', resolveRoute);
        resolveRoute(req, res);
    } else {
        routes['NA'](req, res);
    }
    

}

http.createServer(router).listen(3000, () => console.log('Server running on port 3000.'));