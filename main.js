const redis = require("redis");
const client = redis.createClient();
const LineByLineReader = require('line-by-line');
const lr = new LineByLineReader('websites.txt');

// if you'd like to select database 3, instead of 0 (default), call
// client.select(3, function() { /* ... */ });
client.on("error", function (err) {
    console.log("Error " + err);
});
lr.on('error', function (err) {
	console.log("Error " + err);
});

lr.on('line', function (line) {
	client.sadd("websites", line, function() {
    lr.resume();
  });
	lr.pause();
});
lr.on('end', function () {
	// All lines are read, file is closed now.
  console.log('websites added')
  process.exit();
});
