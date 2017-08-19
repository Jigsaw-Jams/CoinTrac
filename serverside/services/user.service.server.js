var app = require("../../express");
var userModel = require("../model/user/user.model.server");
var bcrypt = require("bcrypt-nodejs");
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
// tells passport to use LocalStrategy, and implement with localStrategy fxn
passport.use(new LocalStrategy({usernameField:"email", passwordField:"password"}, localStrategy));
// tell passport to use the GoogleStrategy and implement ussing googleConfig & googleStrategy fxn
passport.serializeUser(serializeUser);
passport.deserializeUser(deserializeUser);

// API Endpoints and their corresponding functions //
app.post  ("/api/v1/user", createUser);
app.post  ("/api/v1/login", passport.authenticate('local'), login);
app.post  ("/api/v1/logout", logout);
app.get   ("/api/v1/checkLogin", checkLogin);
app.get   ("/api/v1/user", findUser);
app.get   ("/api/v1/users", findAllUsers);
app.get   ("/api/v1/user/:userId", findUserById);
app.put   ("/api/v1/user/:userId", updateUser);
app.delete("/api/v1/user/:userId", deleteUser);
app.put   ("/api/v1/user/:userId/following/:followedId", followUser);
app.delete("/api/v1/user/:userId/following/:unfollowedId", unfollowUser);
app.put   ("/api/v1/user/:userId/watchlist/:coinId", addCoinToWatchlist);
app.delete("/api/v1/user/:userId/watchlist/:coinId", removeCoinFromWatchlist);
app.get   ("/auth/google", passport.authenticate('google', {scope : ['profile', 'email']}));
app.get   ("/google/callback", 
    passport.authenticate('google', {
        successRedirect: "/#!/",
        failureRedirect: "/#!/",
    }));


var googleConfig = {
    clientID     : process.env.GOOGLE_CLIENT_ID,
    clientSecret : process.env.GOOGLE_CLIENT_SECRET,
    callbackURL  : process.env.GOOGLE_CALLBACK_URL
};

passport.use(new GoogleStrategy(googleConfig, googleStrategy));
function googleStrategy(token, refreshToken, profile, done) {
    userModel
        .findUserByGoogleId(profile.id)
        .then(function (user) {
            if (user) {
                return done(null, user);
            } else {
                var email = profile.emails[0].value;
                var emailParts = email.split("@");
                var newGoogleUser = {
                    email: email,
                    isAdmin: false,
                    username: emailParts[0],
                    preferredCurrency: 'USD',
                    google: {
                        id: profile.id,
                        token: token
                    }
                }
            };
            return userModel.createUser(newGoogleUser)
        }, function (err) {
            console.log(err);
        })
        .then(function (user) {
            return done(null, user);
        }, function (err) {
            if (err) { return done(err); }
        });
}

function localStrategy(email, password, done) {
    // passport will ignore all attributes besides exactly, email & password
    userModel
        .findUserByEmail(email)
        .then(function (user) {
            if (user && bcrypt.compareSync(password, user.password)) {
                return done(null, user);
            } else {
                return done(null, false);
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

    //encrypt password
    user.password = bcrypt.hashSync(user.password);
    

    userModel
        .createUser(user)
        .then(function (user) {
            res.send(user);
        }, function (err) {
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

    if (username) {
        userModel
            .findUserByUsername(username)
            .then(function (user) {
                res.send(user);
            }, function (err) {
                console.log(err);
                res.sendStatus(500);
            });
    } else if (email) {
        userModel
            .findUserByEmail(email)
            .then(function (user) {
                res.send(user);
            }, function (err) {
                console.log(err);
                res.sendStatus(500);
            });
    }
}


function findAllUsers (req, res) {
    userModel
        .findAllUsers()
        .then(function (users) {
            res.send(users);
        }, function (err) {
             console.log(err);
             res.sendStatus(500);
        });
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

function updateUser(req, res) {
    var userId = req.params.userId;
    var user = req.body;
    user.password = bcrypt.hashSync(user.password);

    userModel
        .updateUser(userId, user)
        .then(function (user) {
            res.sendStatus(200);
        }, function(err) {
            console.log(err);
            res.sendStatus(500);
        })
}


function deleteUser(req, res) {
    var userId = req.params.userId;

    userModel
        .deleteUser(userId)
        .then(function (user) {
            res.sendStatus(200);
        }, function(err) {
            console.log(err);
            res.sendStatus(500);
        });
}


function addCoinToWatchlist(req, res) {
    var userId = req.params.userId;
    var coinId = req.params.coinId;


    userModel
        .addCoinToWatchlist(userId, coinId)
        .then(function (user) {
            res.send(user);
        }, function (err) {
            res.sendStatus(500);
        })
}


function removeCoinFromWatchlist(req, res) {
    var userId = req.params.userId;
    var coinId = req.params.coinId;

    userModel
        .removeCoinFromWatchlist(userId, coinId)
        .then(function (user) {
            res.send(user);
        }, function (err) {
            res.sendStatus(500);
        })
}



function followUser(req, res) {
    var userId = req.params.userId;
    var followedId = req.params.followedId;

    userModel
        .followUser(userId, followedId)
        .then(function () {
            res.sendStatus(200);
        }, function (err) {
            res.sendStatus(500).message(err);
        });
}


function unfollowUser(req, res) {
    var userId = req.params.userId;
    var unfollowedId = req.params.unfollowedId;

    userModel
        .unfollowUser(userId, unfollowedId)
        .then(function () {
            res.sendStatus(200);
        }, function (err) {
            res.sendStatus(500).message(err);
        });    
}