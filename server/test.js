var emailBuilder = require("./sendEmail.js");

var u = {
			"id": 123,
			"name": 'childData.name',
			"email": "aaroncollyer@gmail.com",
			"golflink": 'childData.golflink',
			"gameCurrent": 'childData.game',
			"gameNew":{}
		}

u.gameNew = {
				"date": 'latestGame.split(", ")[0]',
				"location": 'latestGame.split(", ")[1]',
				"score": 'latestScore',
				"dsr": 'latestDSR',
				"slope": 'latestSlope',
				"ga": 'latestGA'
			}

emailBuilder.send(u, "newgameadded").then(function(msg){
	console.log(msg);
});