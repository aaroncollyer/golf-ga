var request = require('request');
var cheerio = require('cheerio');

exports.getData = function(golflinkNo) {
	return new Promise(
		function (resolve, reject){
			
			var baseURL = "http://www.golflink.com.au/handicap-history/?golflink_No=";
			var urlGolflink = baseURL + golflinkNo;
			request(urlGolflink, function (error, response, html) {
				if (!error && response.statusCode == 200) {
					
					var $ = cheerio.load(html);

					//look up invalid block
					if ($('div#handicap-history-block .invalid').length==0) {

						var latestGame = $('div.trow').first().find(".c2 a").text();
						var latestScore = $('div.trow').first().find(".c3 .cv").text().replace(/\r?\n|\r| /g,'');
						var latestDSR = $('div.trow').first().find(".c5 .cv").text().replace(/\r?\n|\r| /g,'');
						var latestSlope = $('div.trow').first().find(".c8 .cv").text().replace(/\r?\n|\r| /g,'');
						var latestGA = $('div.trow').first().find(".c9 .cv").text().replace(/\r?\n|\r| /g,'');

						var gameData = {
							"date": latestGame.split(", ")[0],
							"location": latestGame.split(", ")[1],
							"score": latestScore,
							"dsr": latestDSR,
							"slope": latestSlope,
							"ga": latestGA
						}

						
						resolve(gameData);

					} else {
						//console.log("Golflink No doesn't not exist. " + golflink_No);
						reject("Golflink No doesn't not exist");
					}
				} else {
					reject(error);
				}

			});
		}
	);
}