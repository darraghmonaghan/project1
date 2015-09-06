

var mongoose = require("mongoose");
var Schema = mongoose.Schema;


var user = new Schema ({
	firstname: String,
	surname: String,
	email: String,
	password: String,
	gamesList: []
});


var User = mongoose.model("User", user);

module.exports = User;
