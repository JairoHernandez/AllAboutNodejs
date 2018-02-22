'use strict';
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

    }
}

for (let key in routes) {
    console.log(key);
    console.log(routes[key]);
}

// get
// { '/': [Function], '/rooms': [Function], '/chat': [Function] }
// post
// {}
