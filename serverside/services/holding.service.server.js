var app = require("../../express");
var holdingModel = require("../model/holding/holding.model.server");


// API Endpoints and their corresponding functions //
app.post  ("/api/v1/user/:userId/holding", createHolding);
app.get   ("/api/v1/user/:userId/holding", findHoldingsForUser);
app.delete("/api/v1/user/:userId/holding/:holdingId", deleteHolding);

function createHolding(req, res) {
    var newHolding = req.body;

    holdingModel
        .createHolding(newHolding)
        .then(function (holding) {
            res.send(holding);
        }, function (err) {
            console.log(err);
            res.sendStatus(500);
        });
}

function findHoldingsForUser(req, res) {
    console.log(req);
    var userId = req.params.userId;

    holdingModel
        .findHoldingsForUser(userId)
        .then(function(holdings) {
            res.send(holdings);
        }, function (err) {
            console.log(err);
            res.sendStatus(404);
        });
}

function deleteHolding(req, res) {

}