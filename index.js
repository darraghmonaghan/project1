
var express = require("express"),
	app = express(),
    bodyParser = require("body-parser"),
    path = require("path"),
    db = require("./models");
    mongoose = require('mongoose');
    views = path.join(__dirname, "views");
    session = require("express-session"),


app.use("/static", express.static("public"));
app.use("/vendor", express.static("bower_components"));


app.use(bodyParser.urlencoded({extended: true}));

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


// SIGN UP PAGE //

app.get('/signup', function (req, res) {
	var signUpPath = path.join(views, 'signup.html');
	res.sendFile(signUpPath);
});


app.post(['/users', "/signup"], function signup(req, res) {
  var user = req.body;
  var firstname = user.firstname;
  var surname = user.surname;
  var email = user.email;
  var password = user.password;
  db.User.createSecure(firstname, surname, email, password, function (err, user) {
    if (err) {
    	console.log("error " + err);
    } else {
    	//console.log('Sign up success');
    	req.login(user);
    	res.redirect('/profile');
    }
  });
});


app.get('/user.json', function (req,res) {
	req.currentUser(function (err, user) {
		//console.log('Console log on retrieval of USER data in JSON' + user)
		res.send(JSON.stringify(user))
	})
})

app.get('user', function (req, res) {
	req.currentUser(function (err, user) {
		res.send(user);
	})
})

// HOME & LOGIN PAGE //

app.get('/', function (req, res) {			// Auto redirect to Login Page //
	res.redirect('/login');
})

app.get('/login', function (req, res) {
	var homePath = path.join(views, "login.html");
	res.sendFile(homePath);
})

app.post(['/sessions', "/login"], function login(req, res) {
	var user = req.body;
	var username = user.email;
	var password = user.password;
	db.User.authenticate(username, password, function (err, user) {
		if (err) {
			console.log("error in authentication");
			res.redirect('/login');
		} else {
			//console.log('Show user details upon login' + user);
			req.login(user);
			res.redirect('/profile');
		}
	});
});



// PROFILE PAGE //

app.get('/profile', function userShow(req, res) {
	req.currentUser(function(err, user) {
		//console.log('Current User details once landed on Profile Page' + user);
		var profilePath = path.join(views, "profile.html");
		res.sendFile(profilePath);
	});
});


// SUBMITTING NEW SCORES //

app.get('/newscore', function (req, res) {
	req.currentUser(function(err, user) {
		var newScore = path.join(views, "newscore.html");
		res.sendFile(newScore);
		//console.log('user data when moving to newScore submission page' + user);
	});
});

app.post('/newscore', function (req, res) {
	req.currentUser(function(err, user) {
		var submission = req.body;
		console.log(submission);
		var dateObj = new Date(submission.date);
		submission.date = dateObj;
		//console.log(submission);
		// //user.gamesList.push(newscore)
		db.Game.create(submission, function (err, newscore) {
		    if (err) { return console.log(err); }
		    else {
		    	//console.log('console log user data on submission of new score' + user);
		    	db.User.findOne({_id: user._id}, function (err, foundUser) {
		    		if (err) {
		    			console.log('error experienced in finding user in DB' + err);
		    		} else {
		    			// console.log('User successfully found in User model' + foundUser);
		    			// update(userId, data, cb)
		    			db.User.update(
		    				{ _id : user._id },
		    				{ $push : { gamesList : 101 }}, 
		    				function(err, user) {
		    					console.log("Game successfully pushed to array");
		    					console.log("USER IS", user);
		    				});
		    		}
		    	})
		    	//$.post()
		    	res.redirect('/profile');
		    }
		});
	});
});


// LOGOUT //

app.get('/logout', function (req, res) {
		req.logout()
		res.redirect('/login');
});

		

// SANITY CHECK //

app.listen(3000, function() {
    console.log("Server is now listening on localhost:3000");
});

