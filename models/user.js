
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');


var user = new Schema ({
	firstname: String,
	surname: String,
	email: String,
	passwordDigest: String,
	gamesList: []
});



// create a new user with secure (hashed) password (for sign up)
user.statics.createSecure = function (firstname, surname, email, password, cb) {
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
user.statics.authenticate = function (email, password, cb) {
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
user.methods.checkPassword = function (password) {
  // run hashing algorithm (with salt) on password to compare with stored `passwordDigest`
  // `compareSync` is like `compare` but synchronous
  // returns true or false
  return bcrypt.compareSync(password, this.passwordDigest);
};



var User = mongoose.model("User", user);

module.exports = User;
