
var express = require("express"),
	app = express(),
    bodyParser = require("body-parser"),
    path = require("path"),
    db = require("./models"),
    mongoose = require('mongoose'),
    views = path.join(__dirname, "views"),
    session = require("express-session");


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

app.post('/newscore', function(req, res) {
            var submission = req.body;
            /*  Get user via findOne & req.session.userId
            	Get newScore object/data
            	users.Gamelist.push(newScoreData)
            */
            db.User.findOne({
                _id: req.session.userId
            }, function(err, user) {

                var newGame = new db.Game(submission);
                console.log(newGame);
                newGame.save(function(err, success) {
                    if (err) {
                        return console.log(err);
                    }
                    console.log("newGame saved successfully.")
                });
                //	console.log(seedGame._id);
                user.gamesList.push(newGame._id);
                //	console.log(user.gamesList);
                user.save(function(err, success) {
                    if (err) {
                        return console.log(err);
                    }
                    console.log(user.firstname + "'s new game has been entered!");
                });
                res.redirect('./profile');
            });
});



app.delete("/games", function (req, res) {
  	//console.log(typeof(req.headers.id));
  	var deleteID = req.headers.id;
  	db.Game.find( {_id : deleteID }, function (err, game) {
  		console.log('Game Found' + game);
  	}).remove(function (err, deleted) {
  		console.log('Successfully deleted' + deleted);
  	});
});

	
app.get('/games', function (req, res) {
	var gameIDs = req.body;
	console.log('CL of gamesIDs' + gameIDs);
	var gamesArray = gameIDs.map(function (gameID) {
		db.Game.findOne({_id: gameID }, function (err, game) {
			if (err) {
				console.log(err);
			} else {
				return game;
			}
		});
		//console.log('Array of full games info here:' + gamesArray);
	});
});


app.get('/currentUser', function (req, res) {

	db.User.findOne({_id: req.session.userId })
    .populate('gamesList')
    .exec(function(err, game) {
        if(err){return console.log(err);}
        if(game.gamesList.length !== 0){
			res.send(game.gamesList);
        } else {
        	res.sendStatus(404)
        }
		// game.gamesList.forEach(function(game) {
		// 	console.log(game);
		// });        
	});
});

// LOGOUT //

app.get('/logout', function (req, res) {
		req.logout()
		res.redirect('/login');
});

		

// SANITY CHECK //

app.listen(process.env.PORT || 3000, function() {
    console.log("Server is now listening on localhost:3000");
});

