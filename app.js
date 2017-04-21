const redis = require("redis");
const client = redis.createClient();
const Spooky = require('spooky');
var x = 'spooky';
var test;

var spooky = new Spooky({
  casper: {
    logLevel: 'debug',
    verbose: true,
  }
}, function(err) {
  if (err) {
    e = new Error('Failed to initialize SpookyJS');
    e.details = err;
    throw e;
  }
  beginScrape();
});

spooky.on('error', function (e, stack) {
    console.error(e);

    if (stack) {
        console.log(stack);
    }
});

function scrape(website) {
  spooky.start(website, function() {
    console.log(website);
    this.waitFor(function check() {
        return this.evaluate(function() {
            return document.querySelectorAll('html');
        });
    }, function then() {    // step to execute when check() is ok
          if (this.exists('div.splash')) {
            this.echo('the element exists');
          } else {
              this.echo('no element: ' + website);
          }
          next();
    }, function timeout() { // step to execute if check has failed
          this.echo("I can't haz my info.").exit();
    });
  });
  spooky.run();
};

function beginScrape() {
  client.spop('websites', function(err, website) {
    console.log(err);
    console.log(website);
    var test = website;
    if (website == null) {
      process.exit();
      return
    } else {
      scrape(website);
    }
  });
};

console.log('Redis data: ', test);

function next() {
  beginScrape();
}
