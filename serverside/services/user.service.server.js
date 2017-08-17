var app = require("../../express");
var userModel = require("../model/user/user.model.server");
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
// tells passport to use LocalStrategy, and implement with localStrategy fxn
passport.use(new LocalStrategy({usernameField:"email", passwordField:"password"}, localStrategy));
passport.serializeUser(serializeUser);
passport.deserializeUser(deserializeUser);

// API Endpoints and their corresponding functions //
app.post("/api/v1/user", createUser);
app.post("/api/v1/login", passport.authenticate('local'), login);
app.post("/api/v1/logout", logout);
app.get ("/api/v1/checkLogin", checkLogin);
app.get ("/api/v1/user", findUser);
app.get ("/api/v1/user/:userId", findUserById);


function localStrategy(email, password, done) {
    // passport will ignore all attributes besides exactly, email & password
    userModel
        .findUserByCredentials(email, password)
        .then(function (user) {
            if (!user) { //invalid user
                // done supplies passport with the user, (or false if failed)
                return done(null, false);
            } else {     //valid user
                return done(null, user);
            }
        }, function (err) {
            if (err) { return done(err); }
        });
}


function serializeUser(user, done) {
    done(null, user);
}

function deserializeUser(user, done) {
    userModel
        .findUserById(user._id)
        .then(function (user) {
            done(null, user);
        }, function (err) {
            done(err, null);
        })
}



function createUser(req, res) {
    var user = req.body;

    userModel
        .createUser(user)
        .then(function (user) {
            res.send(user);
        }, function (err) {
            console.log('error creating user');
            console.log(err);
            res.sendStatus(500);
        });
}


function login(req, res) {
    var user = req.user;
    res.send(user);
}


function logout(req, res) {
    req.logOut();
    res.sendStatus(200);
}

function checkLogin(req, res) {
    // if authenticated return user, otherwise 0
    res.send(req.isAuthenticated() ? req.user: '0');
}



//TODO
function findUser(req, res) {
    var username = req.query.username;
    var email = req.query.email;
    var password = req.query.password;

    if (username) {
        userModel
            .findUserByUsername(username)
            .then(function (user) {
                res.send(user);
            }, function (err) {
                console.log(err);
                res.sendStatus(500);
            });
    }
    

    // username and password lookup
    // if (email && password) {
    //     userModel
    //         .findUserByCredentials(email, password)
    //         .then(function (user) {
    //             if (user != null) {
    //                 res.send(user);
    //             } else {
    //                 res.sendStatus(404);    
    //             }
    //         }, function (err) {
    //             console.log(err);
    //             res.sendStatus(500);
    //         });
    // // username only lookup 
    // } else if (username) {
    //     userModel
    //         .findUserByUsername(username)
    //         .then(function (user) {
    //             if (user != null) {
    //                 res.send(user);
    //             } else {
    //                 res.sendStatus(404);    
    //             }
    //         }, function (err) {
    //             console.log(err);
    //             res.sendStatus(500);
    //         });
    // }
}


function findUserById(req, res) {
    var userId = req.params.userId;

    userModel
        .findUserById(userId)
        .then(function (user) {
            res.send(user);
        }, function () {
            sendStatus(404);
        });
}