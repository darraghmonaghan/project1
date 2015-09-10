
var db = require('./models');


// db.User.remove({}, function(err, users){
// 	console.log("Dropping Database")
// 	db.User.createSecure("nathan", "allen", "fake@fake.co", "123", function(err, user){
// 		console.log("Created 1 user:")
// 		console.log(user)

// 		// ADD A GAME TO THE USER		
// 		user.gamesList.push({date: Date.now(), course: "testing"})
// 		user.save(function(err){
// 			console.log(arguments)
// 			process.exit();
// 		})
// 	})
// })

// db.Game.find({ _id: '55f1db1db839997a3110f653'}, function(err, users){
// 	console.log(users)
// })

// db.User.findOne({email: 'bob@yahoo.com' })
//     .populate('gamesList')
//     .exec(function(err, game) {
//         if(err){return console.log(err);}
// 		res.send(game.gamesList);
// 		// game.gamesList.forEach(function(game) {
// 		// 	console.log(game);
// 		// });        
// });
	




// db.Game.find({}, function (err, res) {
// 	console.log(res);
// });

// db.Games.remove({}, function (err, res) {
// 	console.log(res);
	// db.Games.create({
	// 		date: Date.now(),
	// 		course: 'Augsuta', 
	// 		score: {hole1: 4,
	// 			 	hole2: 4,
	// 			 	hole3: 4,
	// 			 	hole4: 4,
	// 			 	hole5: 4,
	// 			 	hole6: 4,
	// 			 	hole7: 4,
	// 			 	hole8: 4,
	// 			 	hole9: 4,
	// 			 	hole10: 4,
	// 			 	hole11: 4,
	// 			 	hole12: 4,
	// 			 	hole13: 4,
	// 			 	hole14: 4,
	// 			 	hole15: 4,
	// 			 	hole16: 4,
	// 			 	hole17: 4,
	// 			 	hole18: 4} 
	// });
// });


// db.User.create({
// 		firstname: 'Darragh',
// 		surname: 'Monaghan',
// 		email: 'monaghan.darragh@gmail.com',
// 		password: '123',
// 		gamesList: []
// 	}, function (err, user) {
// 	if (err) { return console.log(err); };
// 	console.log(user);
// });


// db.Games.create({
// 		date: Date.now(),
// 		course: 'Sentosa',
// 		score: [{hole1: 4},
// 			 	{hole2: 4},
// 			 	{hole3: 5},
// 			 	{hole4: 2},
// 			 	{hole5: 4},
// 			 	{hole6: 4},
// 			 	{hole7: 6},
// 			 	{hole8: 4},
// 			 	{hole9: 5},
// 			 	{hole10: 2},
// 			 	{hole11: 5},
// 			 	{hole12: 6},
// 			 	{hole13: 4},
// 			 	{hole14: 4},
// 			 	{hole15: 5},
// 			 	{hole16: 6},
// 			 	{hole17: 3},
// 			 	{hole18: 5}]
// 		}, function (err, game) {
// 		if (err) { return console.log(err); };
// 		console.log(game);
// });


// db.Games.create({
// 		date: Date.now(),
// 		course: 'Augusta',
// 		score: [{hole1: 4},
// 			 	{hole2: 4},
// 			 	{hole3: 5},
// 			 	{hole4: 2},
// 			 	{hole5: 4},
// 			 	{hole6: 4},
// 			 	{hole7: 6},
// 			 	{hole8: 4},
// 			 	{hole9: 5},
// 			 	{hole10: 2},
// 			 	{hole11: 5},
// 			 	{hole12: 6},
// 			 	{hole13: 4},
// 			 	{hole14: 4},
// 			 	{hole15: 5},
// 			 	{hole16: 6},
// 			 	{hole17: 3},
// 			 	{hole18: 5}]
// 		}, function (err, game) {
// 		if (err) { return console.log(err); };
// 		console.log(game);
// });
