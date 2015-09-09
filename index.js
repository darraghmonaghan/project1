
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
    	console.log('Sign up success');
    	req.login(user);
    	res.redirect('/profile');
    }
  });
});


app.get('/user.json', function (req,res) {
	req.currentUser(function (err, user) {
		console.log(user)
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
			console.log(user);
			req.login(user);
			res.redirect('/profile');
		}
	});
});



// PROFILE PAGE //

app.get('/profile', function userShow(req, res) {
	req.currentUser(function(err, user) {
		var profilePath = path.join(views, "profile.html");
		res.sendFile(profilePath);
	});
});


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
	    if (err) { return console.log(err); }
	    else {
	    	console.log(newscore + 'successfully input');
	    	// PUSH TO ARRAY HERE???? //
	    	res.redirect('/profile');
	    }
	});
})


// LOGOUT //

app.get('/logout', function (req, res) {
		req.logout()
		res.redirect('/login');
});

		

// SANITY CHECK //

app.listen(3000, function() {
    console.log("Server is now listening on localhost:3000");
});

