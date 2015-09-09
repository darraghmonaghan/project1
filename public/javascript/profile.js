
function scoreTemplating(user) {
      console.log(user + '2')
      var scoresTemplate = _.template($('#scores-template').html());      // Data origin / source will need updated //
      var games = user.games;
      games.forEach(function(game) { 
          var gameHtml = scoresTemplate(game);
          $("#scores-placeholder").append(gameHtml);
      });
}


// ON PAGE READY, EXECUTE //


$(function() {

  $.get('/user.json', function (data) {
    var user = JSON.parse(data);
    $('#welcomeUser').html(user.firstname);       // Get request and then JQuery to welcome user by firstname //
  })

});












