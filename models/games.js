
var mongoose = require("mongoose");
var Schema = mongoose.Schema;


var games = new Schema ({
//	date: new Date(),
	course: {name: String, lattitude: Number, longitude: Number},
	score: [{hole1: Number},
		 	{hole2: Number},
		 	{hole3: Number},
		 	{hole4: Number},
		 	{hole5: Number},
		 	{hole6: Number},
		 	{hole7: Number},
		 	{hole8: Number},
		 	{hole9: Number},
		 	{hole10: Number},
		 	{hole11: Number},
		 	{hole12: Number},
		 	{hole13: Number},
		 	{hole14: Number},
		 	{hole15: Number},
		 	{hole16: Number},
		 	{hole17: Number},
		 	{hole18: Number} ]
});


var user = new Schema ({
	firstname: String,
	surname: String,
	email: String,
	password: String,
	gamesList: [games]
});


var User = mongoose.model("User", user);
var Game = mongoose.model("Games", games);

module.exports = Game;
module.exports = User;