// it: nice seperation of function definition prior to page load and function execution on page load

// ON PAGE READY, EXECUTE //

function welcomeUser() {
  $.get('/user.json', function (data) {         // Get request and then JQuery to welcome user by firstname //
    var user = JSON.parse(data);
    $('#welcomeUser').html(user.firstname);
  })  
}

$(function() {
      
welcomeUser();

});





