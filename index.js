
var express = require("express"),
    bodyParser = require("body-parser"),
    path = require("path"),
    db = require("./models");
    mongoose = require('mongoose');

var app = express(),
    views = path.join(__dirname, "views");

app.use(bodyParser.urlencoded({extended: true}));

app.use("/static", express.static("public"));
app.use("/vendor", express.static("bower_components"));


var user = {
	firstname: 'Darragh',
	surname: 'Monaghan',
	email: 'monaghan.darragh@gmail.com',
	password: '123',
	games: []
};


var games = {
	date: new Date(),
	course: {name: 'Sentosa', lattitude: 1.243800, longitude: 103.829913},
	score: [{hole1: 4},
		 	{hole2: 4},
		 	{hole3: 5},
		 	{hole4: 2},
		 	{hole5: 4},
		 	{hole6: 4},
		 	{hole7: 6},
		 	{hole8: 4},
		 	{hole9: 5},
		 	{hole10: 2},
		 	{hole11: 5},
		 	{hole12: 6},
		 	{hole13: 4},
		 	{hole14: 4},
		 	{hole15: 5},
		 	{hole16: 6},
		 	{hole17: 3},
		 	{hole18: 5}]
};

// console.log(user);
// console.log(games);

// $.post('/', book, function(data) {
// //     console.log(data);
// // });

app.get('/profile', function (req, res) {
	var profilePath = path.join(views, "profile.html");
	res.sendFile(profilePath);
})


app.get('/user', function (req, res) {
	res.send(user);
})

app.listen(3000, function() {
    console.log("Server is now listening on localhost:3000");
})

