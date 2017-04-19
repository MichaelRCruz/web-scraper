var casper = require('casper').create();

var websites = ['http://michaelcruz.io', 'https://www.google.com/', 'https://github.com/'];

function scraper() {
  for (var i = 0; i < websites.length; i++) {
    casper.start(i, function() {
        if (this.exists('div.splash')) {
            this.echo('the heading exists');
        } else {
          this.echo('nada')
        }
    });
    casper.run();
  }
}

scraper();
