var casper = require('casper').create();

var websites = ['http://michaelcruz.io', 'https://www.google.com/', 'https://github.com/'];

function scraper(array) {
  for (var i = 0; i < array.length; i++) {
    casper.start(websites[i], function() {
        if (this.exists('div.splash')) {
          this.echo('the heading exists');
        } else {
            this.echo('nada')
        }
    });
    casper.run();
  }
}

scraper(websites);
