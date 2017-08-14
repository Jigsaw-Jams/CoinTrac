var mongoose = require('mongoose');

var holdingSchema = mongoose.Schema(
    {
        _user       : {type: mongoose.Schema.Types.ObjectId, ref: "UserModel"}, 
        coinId      : String,
        amount      : Number,
        created     : { type: Date, default: Date.now },
        fiatPerCoin : Number,
        fiatCurrency: String,
    },
    { collection: 'holding'}
);

module.exports = holdingSchema;