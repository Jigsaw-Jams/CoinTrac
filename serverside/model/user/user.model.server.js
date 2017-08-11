var mongoose = require('mongoose');

var userSchema = mongoose.Schema(
    {
        email     : { type: String, unique: true, required: true },
        username  : String,
        password  : String,
        //portfolios: [{ type: mongoose.Schema.Types.ObjectId, ref: "PortfolioModel"}],
        //watchlists: [{ type: mongoose.Schema.Types.ObjectId, ref: "WatchlistModel"}],
        created   : {type: Date, default: Date.now}
    }
)