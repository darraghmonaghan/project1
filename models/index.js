
var mongoose = require("mongoose");
mongoose.connect( process.env.MONGOLAB_URI ||
				  process.env.MONGOHQ_URL ||
			   	  "mongodb://localhost/golfscores");

module.exports.User = require("./user");
module.exports.Game = require("./game");

