// Require dependencies and declare userModel
var mongoose = require("mongoose");
var userSchema = require("./user.schema.server");
var userModel = mongoose.model("UserModel", userSchema); 

// Create and export functions that cna be called on this model
userModel.createUser = createUser;
userModel.findUserByCredentials = findUserByCredentials;
userModel.findUserByUsername = findUserByUsername;
userModel.findAllUsers = findAllUsers;
userModel.findUserByEmail = findUserByEmail;
userModel.findUserByGoogleId = findUserByGoogleId;
userModel.findUserById = findUserById;
userModel.addHolding = addHolding;
userModel.removeHolding = removeHolding;
userModel.updateUser = updateUser;
userModel.deleteUser = deleteUser;
userModel.addCoinToWatchlist = addCoinToWatchlist;
userModel.removeCoinFromWatchlist = removeCoinFromWatchlist;
userModel.followUser = followUser;
userModel.unfollowUser = unfollowUser;
module.exports = userModel;


/**
 * Insert a new user using the provided definition
 * 
 * @param {object} user - the user definition
 */
function createUser(user) {
    return userModel.create(user);
}


/**
 * Find a user in the db based on their email address and password
 * 
 * @param {String} email    - user's email
 * @param {String} password - user's password
 */
function findUserByCredentials(email, password) {
    return userModel.findOne({email: email, password: password})
}


/**
 * Find a user by their username
 * 
 * * @param {String} username    - user's username
 */
function findUserByUsername(username) {
    return userModel.findOne({username: username});
}

/**
 * Find a user by their Google ID
 * 
 * @param {String} googleId - users google id 
 */
function findUserByGoogleId(googleId) {
   return userModel.findOne({'google.id': googleId});
}


/**
 * Find a user based on their id
 * 
 * @param {*} userId 
 */
function findUserById(userId) {
    return userModel.findById(userId);
}

/**
 * Find a user based on their email
 * 
 * @param {*} email 
 */
function findUserByEmail(email) {
    return userModel.findOne({email: email});
}

function findAllUsers() {
    return userModel.find({});
}


/**
 * Add a holding belonging to this user. Used by the holding model.
 * 
 * @param {*} userId 
 * @param {*} holdingId 
 */
function addHolding(userId, holdingId) {
    console.log(userId);
    return userModel
        .findUserById(userId)
        .then(function (user) {
            user.portfolio.push(holdingId);
            return user.save();
        });
}


/**
 * Remove a holding belonging to this user. Used by the holding model.
 * 
 * @param {*} userId 
 * @param {*} holdingId 
 */
function removeHolding(userId, holdingId) {
    console.log(userId);
    return userModel
        .findUserById(userId)
        .then(function (user) {
            var index = user.portfolio.indexOf(holdingId);
            user.portfolio.splice(index, 1);
            return user.save();
        });
}

/**
 * Update the user with the given userId
 * 
 * @param {*} userId - the userId to update
 * @param {*} user - the new user definition
 */
function updateUser(userId, user) {
    return userModel.update({_id: userId}, {$set: user});
}

/**
 * Delete the user with the given userId
 * @param {*} userId - the userId to delete
 */
function  deleteUser(userId) {
    return userModel.remove({_id: userId});
}




function addCoinToWatchlist(userId, coinId) {
    return userModel
        .findUserById(userId)
        .then(function (user) {
            var index = user.watchlist.indexOf(coinId);

            if(index === -1) {
                user.watchlist.push(coinId)
                return user.save();
            } else {
                return user;
            }

        }, function (err) {
            console.log(err);
        });
}

function removeCoinFromWatchlist(userId, coinId) {
    return userModel
        .findUserById(userId)
        .then(function (user) {
            var index = user.watchlist.indexOf(coinId);
            user.watchlist.splice(index, 1);
            return user.save();
        }, function (err) {
            console.log(err);
        });
}


function followUser(userId, followedId) {
    return userModel.update({_id: userId}, {$addToSet: {following: followedId}})
        .then(function (user) {
            return userModel.update({_id: followedId}, {$addToSet: {followers: userId}})
        });
}

function unfollowUser(userId, unfollowedId) {
    console.log(userId);
    console.log(unfollowedId);
    
    return userModel.update({_id: userId}, {$pull: {following: unfollowedId}})
        .then(function (user) {
            return userModel.update({_id: unfollowedId}, {$pull: {followers: userId}})
        });
}

// function unfollowUser(userId, unfollowedId) {
//     return userModel
//         .findUserById(userId)
//         .then(function (user) {
//             if (user.following.includes(unfollowedId)) {
//                 var index = user.following.indexOf(unffollowedId);
//                 user.following.splice(index, 1);
//                 user.save();                
//                 return userModel.findUserById(unfollowedId);
//             } 
//         }, function (err) { console.log(err);})
//         .then(function (user) {
//             if (user.followers.includes(userId)) {
//                 var index = user.followers.indexOf(userId);
//                 user.followers.splice(index, 1);
//                 return user.save();                
//             } 
//         }, function (err) { console.log(err);});
// }
