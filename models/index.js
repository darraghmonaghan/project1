
var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/project1");   // NOT SURE OF CONNECTION TO MONGO DB, /project1   ????  //

module.exports.Game = require("./games");
module.exports.Game = require("./user");
