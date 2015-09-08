
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


// app.use(
//   session({
//     secret: 'super-secret-private-keyyy',
//     resave: false,
//     saveUninitialized: true
//   })
// );

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


// SIGN UP PAGE //

app.get('/signup', function (req, res) {
	var signUpPath = path.join(views, 'signup.html');
	res.sendFile(signUpPath);
});


app.post("/signup", function signup(req, res) {
  var user = req.body;
  var firstname = user.firstname;
  var surname = user.surname;
  var email = user.email;
  var password = user.password;
  db.User.createSecure(firstname, surname, email, password, function() {
    res.send(email + " is registered!\n");
  });
});




// HOME & LOGIN PAGE //

app.get('/login', function (req, res) {
	var homePath = path.join(views, "login.html");
	res.sendFile(homePath);
})


app.post("/login", function login(req, res) {
	var user = req.body;
	var username = user.email;
	var password = user.password;
	db.User.authenticate(username, password, function (err, user) {
		res.redirect('/profile');
	});
});








// PROFILE PAGE //

app.get('/profile', function (req, res) {
	var user = user;
	var profilePath = path.join(views, "profile.html");
	res.sendFile(profilePath);
})


// SUBMITTING NEW SCORES //

app.get('/newscore', function (req, res) {
	var newScore = path.join(views, "newscore.html");
	res.sendFile(newScore);
})

app.post('/newscore', function (req, res) {
	var submission = req.body;
	var dateObj = new Date(submission.date);
	submission.date = dateObj;
	console.log(submission);
	console.log(typeof(submission.date));
	// //user.gamesList.push(newscore)
	db.Game.create(submission, function (err, newscore) {
	    if (err) { return console.log(err); };
	    console.log(newscore + 'successfully input');
	    res.redirect('/profile');
	});
})



// USER DATA //

app.listen(3000, function() {
    console.log("Server is now listening on localhost:3000");
});

