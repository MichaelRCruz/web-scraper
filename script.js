const scrapeIt = require("scrape-it");

function scraper(website) {
  scrapeIt('http://ianspizza.com', {
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
  }).then(page => page.links.filter(u => {
      let url = u.url || ''
      return url.includes('.chownow.com')
    }))
    .then(urls => console.log(urls, 'length of relevant URLS:', urls.length))
}
