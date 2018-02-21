'use strict';

const express = require('express');
const app = express(); // app instance already provides server instance so we do not need create an http server.
app.set('port', process.env.PORT || 3000);

// Middleware must a declared function and a plugin to plug it in somewhere.
let helloMiddleware = (req, res, next) => {
    req.hello = "Hello! It's me! I was wondering....you get the idea!";
    next(); // Necessary to keep moving forward.
};

// Plugs Middleware into the request/response stream before route handlers come into effect.
app.use('/dashboard', helloMiddleware); // Using '/' is optional because that means you are hooking up Middleware to all routes.
                               // If you use '/dashboard' then this onlwy works for that route onwards and '/' will console.log undefined.

// Create route handler for root route '/'.
app.get('/', (req, res, next) => { // good practice to leave in next keyword in case additional route handlers are brought in at future date.
    res.send('<h1>Hello Express!</h1>');
    console.log(req.hello);
});

app.get('/dashboard', (req, res, next) => {
    res.send('<h1>This is the dashboard page! Middleware says: ' + req.hello + '</h1>');
});

app.listen(app.get('port'), () => console.log('Chatcat running on port: ', app.get('port')));