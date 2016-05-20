var Firebase = require("firebase");

var emailBuilder = require("./sendEmail.js");
var golflink = require("./golflink.js");

var ref = new Firebase("https://golf-ga.firebaseIO.com/users");
ref.once("value", function(snapshot) {
  	
	snapshot.forEach(function(childSnapshot) {
		var key = childSnapshot.key();
		var childData = childSnapshot.val();

		var u = {
			"id": key,
			"name": childData.name,
			"email": "aaroncollyer@gmail.com",
			"golflink": childData.golflink,
			"gameCurrent": childData.game,
			"gameNew":{}
		}

		golflink.getData(u.golflink).then(function(uGameData){
			
			u.gameNew = uGameData;
			
			//if game is different save and alert
			if (JSON.stringify(uGameData.gameCurrent) === JSON.stringify(uGameData.gameNew)){
				console.log("No change. Skip");
			} else {
				saveGame(uGameData, true);
			};
			
		
		});
		//Add reject

		
	});

},function(err){
   console.log('Not authorized');
   console.log(err)
});

var saveGame = function(u, alert) {
	var fbUserGame = new Firebase("https://golf-ga.firebaseIO.com/users/" + u.id +"/game/");
	
	fbUserGame.set(u.gameNew, function(error) {
		if (error) {
			console.log("Data could not be saved." + error);
			
		} else {
			console.log("Data saved successfully.");
			//console.log(u);
			if(alert) {
				emailBuilder.send(u, "newgameadded").then(function(msg){
					console.log(msg);
				});
			}
		}
	});
};

var sendEmail = function(u, template) {
	return new Promise(
		function(resolve, reject) {

			emailBuilder.send(u, "newgameadded");

		}
	);
}
