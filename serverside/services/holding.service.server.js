var app = require("../../express");
var holdingModel = require("../model/holding/holding.model.server");


// API Endpoints and their corresponding functions //
app.post  ("/api/v1/user/:userId/holding", createHolding);
app.get   ("/api/v1/user/:userId/holding", findHoldingsForUser);
app.put   ("/api/v1/holding/:holdingId", updateHolding);
app.delete("/api/v1/holding/:holdingId", deleteHolding);


function createHolding(req, res) {
    var userId = req.params.userId;
    var newHolding = req.body;

    holdingModel
        .createHolding(userId, newHolding)
        .then(function (holding) {
            res.send(holding);
        }, function (err) {
            console.log(err);
            res.sendStatus(500);
        });
}


function findHoldingsForUser(req, res) {
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


function updateHolding(req, res) {
    var holdingId = req.params.holdingId;
    var holding = req.body;

    holdingModel
        .updateHolding(holdingId, holding)
        .then(function (holding) {
            res.send(holding);
        }, function (err) {
            console.log(err);
            res.sendStatus(500);
        });
}


function deleteHolding(req, res) {
    var holdingId = req.params.holdingId;
    console.log('woag');
    console.log(holdingId);

    holdingModel
        .deleteHolding(holdingId)
        .then(function (status) {
            res.sendStatus(200);
        }, function (err) {
            console.log(err);
            res.sendStatus(500);
        });
}
