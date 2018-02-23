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