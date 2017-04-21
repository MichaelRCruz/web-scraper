var redis = require("redis");
var client = redis.createClient();

// if you'd like to select database 3, instead of 0 (default), call
// client.select(3, function() { /* ... */ });

var websites = ['http://michaelcruz.io', 'https://www.google.com/', 'https://github.com/', 'http://michaelcruz.io', 'http://michaelcruz.io', 'https://vuejs.org/'];

client.on("error", function (err) {
    console.log("Error " + err);
});

for (var i = 0; i < websites.length; i++) {
  client.set("websites", websites[i], redis.print);
};

// 1. populates redis store
// 2. starts ~10 helper scripts
// 3. take broken and put into another file
