'use strict';

const config = require('../config');
const Mongoose = require('mongoose').connect(config.dbURI);

// Log an error if the connection fails
Mongoose.connection.on('error', error => {
    console.log("MongoDB Error: ", error);
});

// Create a Schema that defines the structure for storing user data.
const chatUser = new Mongoose.Schema({
    profiledId: String,
    fullName: String,
    profilePic: String
});

// Turn the schema into a useable model. Mongoose will create plural chatUsers collection on mongolab.
let userModel = Mongoose.model('chatUser', chatUser);

module.exports = {
    Mongoose,
    userModel
};