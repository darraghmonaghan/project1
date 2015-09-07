
var express = require("express"),
	app = express(),
    bodyParser = require("body-parser"),
    path = require("path"),
    db = require("./models");
    mongoose = require('mongoose');
    views = path.join(__dirname, "views");


app.use(bodyParser.urlencoded({extended: true}));
app.use("/static", express.static("public"));
app.use("/vendor", express.static("bower_components"));



// var game1 = {
// 	date: '22/04/2014',
// 	course: {name: 'Sentosa', lattitude: 1.243800, longitude: 103.829913},
// 	score: [{hole1: 4},
// 		 	{hole2: 4},
// 		 	{hole3: 5},
// 		 	{hole4: 2},
// 		 	{hole5: 4},
// 		 	{hole6: 4},
// 		 	{hole7: 6},
// 		 	{hole8: 4},
// 		 	{hole9: 5},
// 		 	{hole10: 2},
// 		 	{hole11: 5},
// 		 	{hole12: 6},
// 		 	{hole13: 4},
// 		 	{hole14: 4},
// 		 	{hole15: 5},
// 		 	{hole16: 6},
// 		 	{hole17: 3},
// 		 	{hole18: 5}]
// };

// var game2 = {
//   date: '01/06/2014',
//   course: {name: 'Belvoir', lattitude: 1.243800, longitude: 103.829913},
//   score: [{hole1: 4},
//           {hole2: 4},
//           {hole3: 5},
//           {hole4: 2},
//           {hole5: 4},
//           {hole6: 4},
//           {hole7: 6},
//           {hole8: 4},
//           {hole9: 5},
//           {hole10: 2},
//           {hole11: 5},
//           {hole12: 6},
//           {hole13: 4},
//           {hole14: 4},
//           {hole15: 5},
//           {hole16: 6},
//           {hole17: 3},
//           {hole18: 5}]
// };

// var user = {
// 	firstname: 'Darragh',
// 	surname: 'Monaghan',
// 	email: 'monaghan.darragh@gmail.com',
// 	password: '123',
// 	games: [game1, game2]
// };



// LOGIN PAGE //

app.get('/home', function (req, res) {
	var homePath = path.join(views, "home.html");
	res.sendFile(homePath);
})


// app.post('/home', function (req, res) {
// 	var email = req.body.email;
// 	var password = req.body.password;
// 	console.log(email);
// 	console.log(password);
// 	res.redirect('/profile');
// })



// PROFILE PAGE //

app.get('/profile', function (req, res) {
	var user = user;
	var profilePath = path.join(views, "profile.html");
	res.sendFile(profilePath);
})

app.post('/profile', function (req, res) {
	var details = req.body
	console.log(details);
	res.redirect('/profile');
})


// SUBMITTING NEW SCORES //

app.get('/newscore', function (req, res) {
	var newScore = path.join(views, "newscore.html");
	res.sendFile(newScore);
})

app.post('/newscore', function (req, res) {
	var newscore = req.body
	console.log(newscore);
	res.redirect('/profile');
})






// app.post("/foods", function (req, res){
//   var newFood = req.body;
//   // add a unique id
//   newFood.id = foods[foods.length - 1].id + 1;
//   // add new food to DB (array, really...)
//   foods.push(newFood);
//   // send a response with newly created object
//   res.send(newFood);
// });











// USER DATA //

app.get('/api/user', function (req, res) {			// Sending JSON formatted User data to Client side (app.js) //
	res.json(user);
})


app.listen(3000, function() {
    console.log("Server is now listening on localhost:3000");
})

