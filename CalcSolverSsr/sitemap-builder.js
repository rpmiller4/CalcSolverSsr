const fs = require('fs');

sitemapPrefix = "https://calc-solver.com"

fs.readFile('./src/App.js', 'utf8' , (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(data);
  matches = data.match(/path='(.+)'/g); //find all paths
  items = matches.map(x => x.match(/\/[\w+|\-+/]+/)); //get contents in single quotes.

  fullpaths = items.map(x => x === null ? sitemapPrefix + "/" : sitemapPrefix + x);

  for (fullpath of fullpaths)
  {
    console.log(fullpath);
  }
  
  var html = [];
  html.push(`<?xml version="1.0" encoding="UTF-8"?>`, `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`);

  for (fullpath of fullpaths)
  {
      html.push(`<url>`, `<loc>`, fullpath, `</loc>`, `</url>`);
  }
  html.push(`</urlset>`);
  sitemapContents = html.join("");

  console.log(sitemapContents);

  const content = 'Some content!'
  
  fs.writeFile('./build/public/sitemap.xml', sitemapContents, { flag: 'w' }, err => {
    if (err) {
        console.error(err)
    }
  });

});
