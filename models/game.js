var mongoose = require("mongoose");
var Schema = mongoose.Schema;

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

var Game = mongoose.model("Game", gamesSchema);
module.exports = Game;
