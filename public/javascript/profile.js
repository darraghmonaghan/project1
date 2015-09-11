

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
    success: function(res) {
      scoreTemplating()
    }
  });
}


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












