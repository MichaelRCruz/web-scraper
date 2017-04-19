var casper = require('casper').create();

var websites = ['http://michaelcruz.io', 'https://www.google.com/', 'https://github.com/'];

// casper.start(websites[0], function() {
//     if (this.exists('div.splash')) {
//       this.echo('the heading exists');
//     } else {
//         this.echo('nada')
//     }
// });
// casper.run();
//
// function scrape() {
//
// }

function scrape(websites) {
  for (var i = 0; i < websites.length; i++) {
    casper.waitFor(function check(websites) {
      return casper.start(websites[i], function() {
      });
      casper.run();
    }, function then() {    // step to execute when check() is ok
      if (this.exists('div.splash')) {
        this.echo('the div exists');
      } else {
          this.echo('nada')
      }
    }, function timeout() { // step to execute if check has failed
        this.echo("I can't haz my info.").exit();
    });
  }
};

scrape(websites);
