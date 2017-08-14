// Require dependencies and declare userModel
var mongoose = require("mongoose");
var holdingSchema = require("./holding.schema.server");
var holdingModel = mongoose.model("HoldingModel", holdingSchema); 


// Create and export functions that cna be called on this model
holdingModel.createHolding = createHolding;
holdingModel.findHoldingsForUser = findHoldingsForUser;
holdingModel.deleteHolding = deleteHolding;
module.exports = holdingModel;



function createHolding(holding) {
    return holdingModel.create(holding);
}


function findHoldingsForUser(userId) {
    return holdingModel.find({_user: userId});
}

function deleteHolding(holdingId) {
    return holdingModel.remove(holdingId);
}