var casper = require('casper').create();

var mcio = 'http://michaelcruz.io';

casper.start(mcio, function() {
    if (this.exists('div.splash')) {
        this.echo('the heading exists');
    } else [
      this.echo('nada')
    ]
});

casper.run();
