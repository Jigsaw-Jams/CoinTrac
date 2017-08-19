var mongoose = require('mongoose');

var userSchema = mongoose.Schema(
    {
        email            : { type: String, unique: true, required: true },
        isAdmin          : Boolean,
        username         : { type: String, unique: true, required: true },
        password         : String,
        preferredCurrency: String,
        portfolio        : [{ type: mongoose.Schema.Types.ObjectId, ref: "HoldingModel"}],
        twitterHandle    : String,
        google: {
            id: String,
            token: String
        },
        following        : [{ type: mongoose.Schema.Types.ObjectId, ref: "UserModel"}],
        followers        : [{ type: mongoose.Schema.Types.ObjectId, ref: "UserModel"}],
        watchlist        : [{ type: String}],
        created          : {type: Date, default: Date.now}
    },
    { collection: 'user'} // Explicitly declare collection name to avoid pluralizing
);

module.exports = userSchema;