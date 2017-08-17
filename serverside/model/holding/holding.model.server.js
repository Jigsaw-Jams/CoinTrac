// Require dependencies and declare userModel
var mongoose = require("mongoose");
var holdingSchema = require("./holding.schema.server");
var holdingModel = mongoose.model("HoldingModel", holdingSchema);
var userModel = require("../user/user.model.server");


// Create and export functions that cna be called on this model
holdingModel.createHolding = createHolding;
holdingModel.findHoldingsForUser = findHoldingsForUser;
holdingModel.deleteHolding = deleteHolding;
module.exports = holdingModel;



function createHolding(userId, holding) {
    return holdingModel
        .create(holding)
        .then(function(holdingDoc) {
            return userModel.addHolding(userId, holdingDoc._id)
        });
}


// Creates a new website instance for user whose _id is userId
function createWebsiteForUser(userId, website) {
    // set the back reference to the user who created the website
    website._user = userId;
    var returnWebsite = null;

    return websiteModel
        .create(website)
        .then(function (websiteDoc) {
            returnWebsite = websiteDoc;
            return userModel.addWebsite(userId, websiteDoc._id);
        })
        .then(function (userDoc) {
           return returnWebsite;
        });
}




function findHoldingsForUser(userId) {
    return holdingModel.find({_user: userId});
}

function deleteHolding(holdingId) {
    return holdingModel.remove(holdingId);
}