
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');

var gamesSchema = new Schema ({
  date: Date,
  course: String, 
  score: {hole1: Number,
      hole2: Number,
      hole3: Number,
      hole4: Number,
      hole5: Number,
      hole6: Number,
      hole7: Number,
      hole8: Number,
      hole9: Number,
      hole10: Number,
      hole11: Number,
      hole12: Number,
      hole13: Number,
      hole14: Number,
      hole15: Number,
      hole16: Number,
      hole17: Number,
      hole18: Number} 
});



var userSchema = new Schema ({
	firstname: {type: String, required: true},
	surname: {type: String, required: true},
	email: {type: String, required: true},
	passwordDigest: {type: String, required: true},
	gamesList: [{type: Schema.Types.ObjectId, ref: 'Game'}]
});



// create a new user with secure (hashed) password (for sign up)
userSchema.statics.createSecure = function (firstname, surname, email, password, cb) {
  // `_this` now references our schema
  var _this = this;
  // generate some salt
  bcrypt.genSalt(function (err, salt) {
    // hash the password with the salt
    bcrypt.hash(password, salt, function (err, hash) {
      // build the user object
      var user = {
      	firstname: firstname,
      	surname: surname,
        email: email,
        passwordDigest: hash,
      };
      // create a new user in the db with hashed password and execute the callback when done
      _this.create(user, cb);
    });
  });
};



// authenticate user (for login)
userSchema.statics.authenticate = function (email, password, cb) {
  // find user by email entered at log in
  this.findOne({email: email}, function (err, user) {
    // throw error if can't find user
    if (user === null) {
      cb("Can\'t find user with that email", null);
    // if found user, check if password is correct
    } else if (user.checkPassword(password)) {
      // the user is found & password is correct, so execute callback
      // pass no error, just the user to the callback
      cb(null, user);
    } else {
      // user found, but password incorrect
      cb("password incorrect", user)
    }
  });
};


// compare password user enters with hashed password (`passwordDigest`)
userSchema.methods.checkPassword = function (password) {
  // run hashing algorithm (with salt) on password to compare with stored `passwordDigest`
  // `compareSync` is like `compare` but synchronous
  // returns true or false
  return bcrypt.compareSync(password, this.passwordDigest);
};

var Game = mongoose.model("Game", gamesSchema);
var User = mongoose.model("User", userSchema);

module.exports = User;
