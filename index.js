
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
  req.login = function (user) {               // login a user //
    req.session.userId = user._id;
  };
  req.currentUser = function (cb) {           // find the current user //
    db.User.
      findOne({ _id: req.session.userId },
      function (err, user) {
        req.user = user;
        cb(null, user);
      })
  };
  req.logout = function () {                  // logout the current user //
    req.session.userId = null;
    req.user = null;
  }
  next();                                     // call the next middleware in the stack
});


// SIGN UP PAGE //

app.get('/signup', function (req, res) {
	var signUpPath = path.join(views, 'signup.html');
	res.sendFile(signUpPath);
});


app.post(['/users', "/signup"], function signup(req, res) {
  var user = req.body;
  var firstname = user.firstname;                           // Extract all required Signup information //
  var surname = user.surname;
  var email = user.email;
  var password = user.password;
  db.User.createSecure(firstname, surname, email, password, function (err, user) {      // Feed extracted signup data into function //
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
	var username = user.email;                 // Extracting username and password data //  
	var password = user.password;              
	db.User.authenticate(username, password, function (err, user) {
		if (err) {
			console.log("error in authentication");
			res.redirect('/login');                // redirect to LOGIN page if authentication fails // 
		} else {                                
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

            db.User.findOne({                 // querying DB to find the current user via the Session ID //
                _id: req.session.userId
            }, function(err, user) {

                var newGame = new db.Game(submission);
                // console.log(newGame);
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
  	//console.log(req.headers.id);             // testing to see the reciept of game ID in header, sent over vai AJAX request on Delete function //         
  	var deleteID = req.headers.id;             // set game ID to a variable for use //
  	db.Game.find( {_id : deleteID }, function (err, game) {      // Stage 1. Querying the DB to find the relevant game using GameID //
  		console.log('Game Found' + game);
  	}).remove(function (err, deleted) {                          // Stage 2. Chaining the remove() on to stage.1 in order to DELETE the GameID // 
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

	db.User.findOne({_id: req.session.userId })        // Find current user through querying DB using SessionID //
    .populate('gamesList')                           // Populate() converts the gameID's stored in the gamesList array into an array of game OBJECTS, with all relevant game data stored within each game object //
    .exec(function(err, game) {
        if(err){return console.log(err);}
        if(game.gamesList.length !== 0){             // Stage 1. If gamesList contains any gameID's, then send the gamesList on query //
			   res.send(game.gamesList);                   
        } else {                                     // Stage 2. If gamesList is empty, then  do not send the gamesList Array, THIS STOPS NODEMON CRASHING //
        	res.sendStatus(404)
        }       
	});
});

// LOGOUT //

app.get('/logout', function (req, res) {
		req.logout()                                      // Execute logout() and redirect to Login / Homepage //
		res.redirect('/login');
});

		

// SANITY CHECK //

app.listen(process.env.PORT || 3000, function() {
    console.log("Server is now listening on localhost:3000");
});

