
function welcomeUser(user) {
  console.log(user + '1')
  var firstname = user.firstname;
  $('#welcomeUser').text(firstname);
}

function scoreTemplating(user) {
      console.log(user + '2')
      var scoresTemplate = _.template($('#scores-template').html());
      var games = user.games;
      games.forEach(function(game) { 
          var gameHtml = scoresTemplate(game);
          $("#scores-placeholder").append(gameHtml);
      });
}

$(function() {
    
    var user;

   $.get('/api/user', function(data) {
      console.log(data);
      user = data;
        welcomeUser(user);
        scoreTemplating(user);
  })

});












