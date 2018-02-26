'use strict';

// The express-session is like any other middleware that plugs into the request and response.
const session = require('express-session');
// connect-mongo listens for config changes from session instance.
const MongoStore = require('connect-mongo')(session); 
const config = require('../config');

// Ensure we are the ones who originally created cookie and that data has not been tampered with.
// to prevent a hacker from high-jacking a session cookie to gain access to secure routes in your app.
// Use signed session cookies that have been encrypted using a hash or secret key, which only we
// know as the owner of the app.

if (process.env.NODE_ENV === 'production') {
    // Initialize session with settings for production.
    module.exports = session({
        secret: config.sessionSecret,
        resave: false,
        saveUninitialized: false, // Cookie will only be saved if session has been initialized with data.
         // By default if in dev env it stores session data in memory, but that is absolutely NOT 
        // the recommendation for production because that would not scale and kill server performance.
        store: new MongoStore({ 
                mongooseConnection: db.Mongoose.connection
        })
    });
} else {
    // Initialize session with settings for dev env.
    module.exports = session({
        secret: config.sessionSecret,
        resave: false, // Default is true, which means middleware will attemp to save session data again 
                      // and again into session store. Even if the data in the session has not changed.
                      // This means a ton of undesirable calls to your DB.
        saveUninitialized: true // Saves cookie in browser as well as create associated entry in session 
                                // store even when the session has not been initialized with any data.
                                // In other words "no data but still a session cookie". However, while
                                // in productions you dont want sessions initialized when there's nothing
                                // to store in them. In fact, privacy laws might require you to only 
                                // create a cookie in the user's browser if and only if the user logs in 
                                // to have data to store or else an infringement might occurr. That is
                                // why it's best to set production value to false.
    });
}

