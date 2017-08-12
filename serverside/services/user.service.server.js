var app = require("../../express");
var userModel = require("../model/user/user.model.server");


// API Endpoints and their corresponding functions //
app.post("/api/v1/user", createUser);
app.get ("/api/v1/user", findUserByCredentials);
app.get ("/api/v1/user/:userId", findUserById);

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


function findUserByCredentials(req, res) {
    var email = req.query.email;
    var password = req.query.password;
    var username = req.query.username;

    // username and password lookup
    if (email && password) {
        userModel
            .findUserByCredentials(email, password)
            .then(function (user) {
                if (user != null) {
                    res.send(user);
                } else {
                    res.sendStatus(404);    
                }
            }, function (err) {
                console.log(err);
                res.sendStatus(500);
            });
    // username only lookup 
    } else if (username) {
        userModel
            .findUserByUsername(username)
            .then(function (user) {
                if (user != null) {
                    res.send(user);
                } else {
                    res.sendStatus(404);    
                }
            }, function (err) {
                console.log(err);
                res.sendStatus(500);
            });
    }
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