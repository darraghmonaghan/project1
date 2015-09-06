
var db = require('./models');

db.User.create({
		firstname: 'Darragh',
		surname: 'Monaghan',
		email: 'monaghan.darragh@gmail.com',
		password: '123',
		gamesList: []
	}, function (err, user) {
	if (err) { return console.log(err); };
	console.log(user);
});


db.Games.create({
		date: Date.now(),
		course: 'Sentosa',
		score: [{hole1: 4},
			 	{hole2: 4},
			 	{hole3: 5},
			 	{hole4: 2},
			 	{hole5: 4},
			 	{hole6: 4},
			 	{hole7: 6},
			 	{hole8: 4},
			 	{hole9: 5},
			 	{hole10: 2},
			 	{hole11: 5},
			 	{hole12: 6},
			 	{hole13: 4},
			 	{hole14: 4},
			 	{hole15: 5},
			 	{hole16: 6},
			 	{hole17: 3},
			 	{hole18: 5}]
		}, function (err, game) {
		if (err) { return console.log(err); };
		console.log(game);
});


db.Games.create({
		date: Date.now(),
		course: 'Augusta',
		score: [{hole1: 4},
			 	{hole2: 4},
			 	{hole3: 5},
			 	{hole4: 2},
			 	{hole5: 4},
			 	{hole6: 4},
			 	{hole7: 6},
			 	{hole8: 4},
			 	{hole9: 5},
			 	{hole10: 2},
			 	{hole11: 5},
			 	{hole12: 6},
			 	{hole13: 4},
			 	{hole14: 4},
			 	{hole15: 5},
			 	{hole16: 6},
			 	{hole17: 3},
			 	{hole18: 5}]
		}, function (err, game) {
		if (err) { return console.log(err); };
		console.log(game);
});
