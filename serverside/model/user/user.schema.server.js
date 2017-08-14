var mongoose = require('mongoose');

var userSchema = mongoose.Schema(
    {
        email            : { type: String, unique: true, required: true },
        username         : String,
        password         : String,
        preferredCurrency: String,
        portfolio        : [{ type: mongoose.Schema.Types.ObjectId, ref: "HoldingModel"}],
        //watchlists       : [{ type: mongoose.Schema.Types.ObjectId, ref: "WatchlistModel"}],
        created          : {type: Date, default: Date.now}
    },
    { collection: 'user'} // Explicitly declare collection name to avoid pluralizing
);

module.exports = userSchema;