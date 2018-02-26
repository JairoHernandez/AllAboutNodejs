'use strict';
const h = require('../helpers');

// Preferred technique by teacher, but you can do individual router.get/post() if u prefer.
// Order of routes is critical the ones at top run first.
module.exports = () => {
    let routes = {
        get: {
            '/': (req, res, next) => {
                res.render('login');
            },
            '/rooms': (req, res, next) => {
                res.render('rooms');
            },
            '/chat': (req, res, next) => {
                res.render('chatroom');
            },
            '/getsession': (req, res, next) => {
                console.log(req.session);
                res.send(`My favorite color: ${req.session.favColor}`); // ES6 notation is how I got this to work.
            },
            '/setsession': (req, res, next) => {
                req.session.favColor = "Red";
                res.send("Session Set");
            }
        },
        post: {

        },
        'NA': (req, res, next) => {
            // process.cwd() resolves to dir where server.js lives or the
            // file you invoke using command  'node' or 'nodemon'.
            res.status(404).sendFile(process.cwd() + '/views/404.htm');
        }
    }

    return h.route(routes);
};