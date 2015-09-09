

// ON PAGE READY, EXECUTE //


$(function() {
      
  $.get('/user.json', function (data) {         // Get request and then JQuery to welcome user by firstname //
    var user = JSON.parse(data);
    $('#welcomeUser').html(user.firstname);
  })  

});





