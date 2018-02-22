'use strict';
const express = require('express');
const app = express(); // app instance already provides server instance so we do not need create an http server.
const chatCat = require('./app'); // finds index.js by default

app.set('port', process.env.PORT || 3000);
// app.set('views', './views'); // Change default folder where dynamic templates are found.
app.set('view engine', 'ejs');
// Middleware for serving static content.
app.use(express.static('public'));

/** // Middleware must a declared function and a plugin to plug it in somewhere.
let helloMiddleware = (req, res, next) => {
    req.hello = "Hello! It's me! I was wondering....you get the idea!";
    next(); // Necessary to keep moving forward.
};

// Plugs Middleware into the request/response stream before route handlers come into effect.
app.use('/dashboard', helloMiddleware); // Using '/' is optional because that means you are hooking up Middleware to all routes.
                               // If you use '/dashboard' then this onlwy works for that route onwards and '/' will console.log undefined. **/


app.use('/', chatCat.router);

app.listen(app.get('port'), () => console.log('Chatcat running on port: ', app.get('port')));