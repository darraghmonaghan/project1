

function getUserData() { 
   var user;
   $.get('/api/user', function(data) {
      user = data;
        welcomeUser(user);
  })
}


function welcomeUser(user) {
  var firstname = user.firstname;
  $('#welcomeUser').text(firstname);
}


// ON PAGE READY, EXECUTE //


$(function() {
    
  getUserData()


});





