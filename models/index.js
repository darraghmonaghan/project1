
var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/");


module.exports.Game = require("./games");
module.exports.User = require("./user");
