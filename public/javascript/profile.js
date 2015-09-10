


function getData() {
  $.get('/user.json', function (data) {
    var user = JSON.parse(data);
    console.log('Data received through AJAX in JSON format' , user);
    $('#welcomeUser').html(user.firstname);    // Get request and then JQuery to welcome user by firstname //
  })
}


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
      console.log("RAW DATA: ", data);
      var gamesList = data;
      // run the template train on gamesList;

      // OOOORRRRRR

      // do some array math here, then create smaller chunks
   });
}
      // console.log('games list here: ' + gameIDs);
      //   $.get('/games', Data, function(games){
      //     console.log(games);
      //   });





      // for (var i = 0; i < games.length; i++) {
      //   //make a GET request to retrive all game data 
      //   $.get('/games', function (data) {
      //     // receive game data and send to templating

      
         

 



      // console.log(games);
      // var scoresTemplate = _.template($('#scores-template').html());      // Data origin / source will need updated //
      //     games.forEach(function(game) { 
      //     var gameHtml = scoresTemplate(game);
      //     $("#scores-placeholder").append(gameHtml);
      // });   
//   });
// };



// ON PAGE READY, EXECUTE //


$(function() {

  getData();
  scoreTemplating();


});












