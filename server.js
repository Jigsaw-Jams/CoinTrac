// app setup and module import -----------------------------------------
var app = require('./express');
var express = app.express;

var bodyParser    = require('body-parser');
var passport      = require('passport');
var cookieParser  = require('cookie-parser');
var session       = require('express-session');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// serve static files from the /public directory
app.use(express.static(__dirname + '/public'));
// initialize session 
app.use(session({
    secret: process.env.COINTRAC_SESSION_SECRET,
    resave: true,
    saveUninitialized: true
}));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());


// Run the serverside Node app
require("./serverside/app")

// run server ----------------------------------------------------------
// if the heroku PORT is present use that, otherwise 3000
var port = process.env.PORT || 3000;
app.listen(port);
console.log('Express listening on port ' + port);