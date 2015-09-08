
var express = require("express"),
	app = express(),
    bodyParser = require("body-parser"),
    path = require("path"),
    db = require("./models");
    mongoose = require('mongoose');
    views = path.join(__dirname, "views");
    session = require("express-session"),


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


app.use(
  session({
    secret: 'super-secret-private-keyyy',
    resave: false,
    saveUninitialized: true
  })
);

app.use(function (req, res, next) {
  // login a user
  req.login = function (user) {
    req.session.userId = user._id;
  };
  // find the current user
  req.currentUser = function (cb) {
    db.User.
      findOne({ _id: req.session.userId },
      function (err, user) {
        req.user = user;
        cb(null, user);
      })
  };
  // logout the current user
  req.logout = function () {
    req.session.userId = null;
    req.user = null;
  }
  // call the next middleware in the stack
  next(); 
});


// HOME & LOGIN PAGE //

app.get('/home', function (req, res) {
	var homePath = path.join(views, "home.html");
	res.sendFile(homePath);
})


app.post("/home", function login(req, res) {
	var info = req.body;
	console.log(info);
	var email = info.email;
	var password = info.password;
	db.User.authenticate(email, password, function (err, user) {
		req.login(info);
		res.redirect('/profile');
		//res.send(user + " is logged in\n");
	});
});


// app.post(['/home', '/signup'] function (req, res) {
// 	var details = req.body
// 	console.log(details);
// 	res.send('Details Received');
// })


// SIGN UP PAGE //

app.get('/signup', function (req, res) {
	var signUpPath = path.join(views, 'signup.html');
	res.sendFile(signUpPath);
});


app.post("/signup", function signup(req, res) {
  var info = req.body;
  var firstname = info.firstname;
  var surname = info.surname;
  var email = info.email;
  var password = info.password;
  db.User.createSecure(firstname, surname, email, password, function() {
    res.send(email + " is registered!\n");
  });
});




// PROFILE PAGE //

app.get('/profile', function (req, res) {
	var user = user;
	var profilePath = path.join(views, "profile.html");
	res.sendFile(profilePath);
})

// app.post('/profile', function (req, res) {
// 	var details = req.body
// 	console.log(details);
// 	res.redirect('/profile');
// })


// SUBMITTING NEW SCORES //

app.get('/newscore', function (req, res) {
	var newScore = path.join(views, "newscore.html");
	res.sendFile(newScore);
})

app.post('/newscore', function (req, res) {
	// var newscore = req.body;
	// console.log(newscore);	
	// //user.gamesList.push(newscore)
	// db.Games.insert({newscore}, function (err, newscore) {
	//     if (err) { return console.log(err); };
	//     console.log(newscore + 'successfully input');
	// });
	// res.redirect('/profile');
})



// USER DATA //

// app.get('/api/user', function (req, res) {			// Sending JSON formatted User data to Client side (app.js) //
// 	res.json(user);
// })


app.listen(3000, function() {
    console.log("Server is now listening on localhost:3000");
});

