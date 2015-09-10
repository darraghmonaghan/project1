
var mongoose = require("mongoose");
mongoose.connect( process.env.MONGOLAB_URI ||
				  process.env.MONGOHQ_URL ||
			   	  "mongodb://localhost/golfscores");

module.exports.Game = require("./games");
module.exports.User = require("./user");
