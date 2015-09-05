
var game1 = {
  date: '22/04/2014',
  course: {name: 'Sentosa', lattitude: 1.243800, longitude: 103.829913},
  score: [{hole1: 4},
          {hole2: 4},
          {hole3: 5},
          {hole4: 2},
          {hole5: 4},
          {hole6: 4},
          {hole7: 6},
          {hole8: 4},
          {hole9: 5},
          {hole10: 2},
          {hole11: 5},
          {hole12: 6},
          {hole13: 4},
          {hole14: 4},
          {hole15: 5},
          {hole16: 6},
          {hole17: 3},
          {hole18: 5}]
};

var game2 = {
  date: '01/06/2014',
  course: {name: 'Belvoir', lattitude: 1.243800, longitude: 103.829913},
  score: [{hole1: 4},
          {hole2: 4},
          {hole3: 5},
          {hole4: 2},
          {hole5: 4},
          {hole6: 4},
          {hole7: 6},
          {hole8: 4},
          {hole9: 5},
          {hole10: 2},
          {hole11: 5},
          {hole12: 6},
          {hole13: 4},
          {hole14: 4},
          {hole15: 5},
          {hole16: 6},
          {hole17: 3},
          {hole18: 5}]
};

var user = {
  firstname: 'Darragh',
  surname: 'Monaghan',
  email: 'monaghan.darragh@gmail.com',
  password: '123',
  games: [game1, game2]
};

 






$(function() {

      var scoresTemplate = _.template($('#scores-template').html());
      var games = user.games;
      games.forEach(function(game) { 
          var gameHtml = scoresTemplate(game);
          $("#scores-placeholder").append(gameHtml);
      });
});







