var casper = require('casper').create();

var websites = ['http://michaelcruz.io', 'https://www.google.com/', 'https://github.com/', 'http://michaelcruz.io', 'http://michaelcruz.io', 'https://vuejs.org/'];
var brokenSites = [];
var repairCount = 0;

function scrape() {
  casper.start(websites[0], function() {
    casper.waitFor(function check() {
        return this.evaluate(function() {
            return document.querySelectorAll('html');
        });
    }, function then() {    // step to execute when check() is ok
          if (this.exists('div.splash')) {
            this.echo('the element exists');
          } else {
              repairCount++;
              this.echo('no element: ' + websites[0]);
          }
          next();
    }, function timeout() { // step to execute if check has failed
          this.echo("I can't haz my info.").exit();
    });
  });
  casper.run();
};

function beginScrape() {
  if (websites.length == 0) {
    console.log(repairCount + ' websites in need of repair.');
    return brokenSites;
  }
  scrape();
};

function next() {
  brokenSites.push(websites[0]);
  websites.shift();
  beginScrape();
}

beginScrape();
