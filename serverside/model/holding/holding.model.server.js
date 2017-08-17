// Require dependencies and declare userModel
var mongoose = require("mongoose");
var holdingSchema = require("./holding.schema.server");
var holdingModel = mongoose.model("HoldingModel", holdingSchema);
var userModel = require("../user/user.model.server");


// Create and export functions that cna be called on this model
holdingModel.createHolding = createHolding;
holdingModel.findHoldingsForUser = findHoldingsForUser;
holdingModel.updateHolding = updateHolding;
holdingModel.deleteHolding = deleteHolding;
module.exports = holdingModel;



function createHolding(userId, holding) {
    return holdingModel
        .create(holding)
        .then(function(holdingDoc) {
            return userModel.addHolding(userId, holdingDoc._id)
        });
}

function updateHolding(holdingId, holding) {
    return holdingModel.update({_id: holdingId}, {$set: holding});
}

function findHoldingsForUser(userId) {
    return holdingModel.find({_user: userId});
}

//TODO UPDATE TO CASCADE DELETE
function deleteHolding(holdingId) {
    return holdingModel.remove({_id: holdingId});
}