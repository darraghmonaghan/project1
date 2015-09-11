


function getData() {
  $.get('/user.json', function (data) {
    var user = JSON.parse(data);
    console.log('Data received through AJAX in JSON format' , user);
    $('#welcomeUser').html(user.firstname);    // Get request and then JQuery to welcome user by firstname //
  });
}

function deleteScore(context) {
  //console.log(context);
  var deleteID = $(context).data('id');
  console.log(deleteID);
  $.ajax({
    url: '/games',
    type: 'DELETE',
    headers: {'ID': deleteID},
    //success: function(res) {
  });
}


  // var gameId = 
  // console.log('Game ID on Delete Request shown here: ' + gameId)
  // $.ajax({
  //   url: '/games/' + gameId,
  //   type: 'DELETE',
  //   success: function(res) {
  //     // once successfull, re-render all foods
  //     scoreTemplating();


// function deleteFood(context) {
//   var foodId = $(context).data().id;
//   $.ajax({
//     url: '/foods/' + foodId,
//     type: 'DELETE',
//     success: function(res) {
//       // once successfull, re-render all foods
//       getFoods();
//     }
//   });
// }



// function scoreTemplating(user) {
//     $.get('/user.json', function (data) {      
//       var user = JSON.parse(data);
//       var Data = {};
//       var gameIDs = user.gamesList;
//       data.gameIds = gameIDs;
//       console.log('games list here: ' + gameIDs);
//         $.get('/games', Data, function(games){
//           console.log(games);
//         });
//     });
// }

function scoreTemplating() {
   $.get('/currentUser', function(data) {
      console.log("Raw data from templating function: ", data);
      var gamesList = data;
      // run the template train on gamesList;
      var scoresTemplate = _.template($('#scores-template').html());      // Data origin / source will need updated //
          data.forEach(function(game) { 
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












