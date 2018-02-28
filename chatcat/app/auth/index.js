'use strict';
const passport = require('passport');
const config = require('../config');
const FacebookStrategy = require('passport-facebook').Strategy;
const h = require('../helpers');

module.exports = () => {

    let authProcessor = (accessToken, refreshToken, profile, done) => {
        // Find a user in local mongodb using profile.id.
        // If user is found return the user data using done().
        // If user profile is not found, create one in the local db and return.
        h.findOne(profile.id).then(result => {
            if (result) {
                // null posiito is where error is held if you want to check 
                // for server errors place null in most cases
                // done() returns result
                done(null, result);
            } else {
                // Create new user and return
                h.createNewUser(profile)
                    .then(newChatUser => done(null, newChatUser))
                    .catch(error => console.log('Error when creating new user.'));
            } 
        })
    };

    // accessToken & refreshToken are provided by Facebook OAuth 2.0.
    // For Twitter Oauth 1.0 we are provided token sdn token secret instead.
    passport.use(new FacebookStrategy(config.fb, authProcessor));
}

