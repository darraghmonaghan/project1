
var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/");


module.exports.Games = require("./games");
module.exports.User = require("./user");
