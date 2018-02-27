'use strict';
const passport = require('passport');
const config = require('../config');
const FacebookStrategy = require('passport-facebook').Strategy;

module.exports = () => {

    let authProcessor = (accessToken, refreshToken, profile, done) => {
        // Find a user in local mongodb using profile.id.
        // If user is found return the user data using done().
        // If user profile is not found, create one in the local db and return.
    };

    // accessToken & refreshToken are provided by Facebook OAuth 2.0.
    // For Twitter Oauth 1.0 we are provided token sdn token secret instead.
    passport.use(new FacebookStrategy(config.fb, authProcessor));
}

