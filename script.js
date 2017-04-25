const scrapeIt = require("scrape-it");
const redis = require("redis");
const client = redis.createClient();

module.exports = function(website) {
  return scrapeIt(website, {
    links: {
      listItem: '*',
      data: {
        title: 'a',
        url: {
          selector: "a",
          attr: "href"
        }
      }
    }
  })
  //.then(page => page.links.filter(u => {
  //    let url = u.url || ''
  //    return url.includes('.chownow.com')
  //  }))
    //.then(urls => console.log(urls, 'length of relevant URLS:', urls.length))
}

function nextSite() {
  client.spop('websites', function(err, website) {
    console.log('err', err);
    console.log('website', website);

    if (website == null) {
      console.log('done?')
      return
    } else if (err) {
      console.log('error!!!!', err);
      process.exit();
    }else {
      scraper(website).then(value => {
        // placeholder
        console.log('returned value for', website, 'is', value)
      });

      nextSite();
    }
  });
}

//nextSite()
