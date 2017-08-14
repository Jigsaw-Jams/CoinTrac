// Build connection string
var connectionString = 'mongodb://127.0.0.1:27017/cointrac'; // for local connection
if(process.env.MONGODB_URI) {                       // check if running remotely
    // var username = process.env.MLAB_USERNAME_WEBDEV;         // get from environment
    // var password = process.env.MLAB_PASSWORD_WEBDEV;
    // connectionString = 'mongodb://' + username + ':' + password;
    // connectionString += '@ds139288.mlab.com:39288/heroku_h69gv6xf';
    var connectionString = process.env.MONGODB_URI;
}

// require dependencies and connect to database
var q = require('q');
var mongoose = require("mongoose");
var db = mongoose.connect(connectionString);
mongoose.Promise = q.Promise;
module.exports = db;


// require all services
require("./services/user.service.server")
require("./services/holding.service.server")