

function getData() {
  $.get('/user.json', function (data) {
    var user = JSON.parse(data);
    console.log('Data received through AJAX in JSON format' , user);
    $('#welcomeUser').html(user.firstname);    // Get request and then JQuery to welcome user by firstname //
  });
}

function deleteScore(context) {               // Function is called from the ONCLICK attribute in HTML page //
  //console.log(context);
  var deleteID = $(context).data('id');       // Extracting value from Data-ID attribute, taken from INPUT in PROFILE.HTML //
  console.log(deleteID);
  $.ajax({                                  
    url: '/games',                            // AJAX request to DELETE route //
    type: 'DELETE',
    headers: {'ID': deleteID},                // variable deleteID placed into the header being sent //
    success: function(res) {
      scoreTemplating()                       // this function is not working yet / or res.redirect on route //
    }
  });
}


function scoreTemplating() {
   $.get('/currentUser', function(data) {                                 // AJAX request to get current User data //
      console.log("Raw data from templating function: ", data);
      var gamesList = data;
      
      var scoresTemplate = _.template($('#scores-template').html());      // User data run through templating function //
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












