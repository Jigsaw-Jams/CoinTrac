// app setup and module import -----------------------------------------
const express = require('express');
const app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// serve static files from the /public directory
app.use(express.static(__dirname + '/public'));


// Run the serverside Node app
require("./serverside/app")

// run server ----------------------------------------------------------
// if the heroku PORT is present use that, otherwise 3000
var port = process.env.PORT || 3000;
app.listen(port);
console.log('Express listening on port ' + port);