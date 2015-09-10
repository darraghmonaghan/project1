
function getData() {
  $.get('/user.json', function (data) {
    var user = JSON.parse(data);
    console.log(user);
    $('#welcomeUser').html(user.firstname);
           // Get request and then JQuery to welcome user by firstname //
  })
}


function scoreTemplating(user) {
    $.get('/user.json', function (data) {
      var user = JSON.parse(data);
      var games = user.gamesList;
      var scoresTemplate = _.template($('#scores-template').html());      // Data origin / source will need updated //
          games.forEach(function(game) { 
          var gameHtml = scoresTemplate(game);
          $("#scores-placeholder").append(gameHtml);
      });   
    });
};



// ON PAGE READY, EXECUTE //


$(function() {

  getData();
  scoreTemplating();

});












