console.log("The bot is starting")

var Twit = require('twit');

var config = require('./config');

var T = new Twit(config);

num = 1;
sendTweet()
setInterval(sendTweet, 1000*60);

var stream = T.stream('user');

stream.on('follow', followed);

function followed(eventMsg) {
	console.log('followed');
	var name = eventMsg.source.name;
	var screenName = eventMsg.source.screen_name;
	sendThanksTweet('Hey @' + screenName + ' thanks for following me!');
}

function sendTweet() {
	num = num + 1;
	var tweet = {
		status:'current number:' + num
	}

	T.post('statuses/update', tweet , tweeted);

	function tweeted(err, data, response) {
	  if(err){
	  	console.log('Something went wrong');
	  }
	  else{
	  	console.log('It worked!');
	  }
	}
}

function sendThanksTweet(txt) {
	
	var tweet = {
		status: txt
	}

	T.post('statuses/update', tweet , tweeted);

	function tweeted(err, data, response) {
	  if(err){
	  	console.log('Something went wrong');
	  }
	  else{
	  	console.log('It worked!');
	  }
	}
}


