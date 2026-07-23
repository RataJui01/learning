// TODO: build the recipe book server here — see the spec below for what to implement.
const fs = require('fs');
const http = require('http');
const url = require('url');
const replaceTemplate = require('./modules/replaceTemplate');

const tempOverview = fs.readFileSync(
  './templates/template-overview.html',
  'utf-8',
);
const tempRecipe = fs.readFileSync('./templates/template-recipe.html', 'utf-8');
const tempCard = fs.readFileSync('./templates/template-card.html', 'utf-8');
const data = fs.readFileSync('./dev-data/data.json', 'utf-8');
const dataObj = JSON.parse(data);

const server = http.createServer((req, res) => {
  const { query, pathname } = url.parse(req.url, true);

  if (pathname === '/' || pathname === '/overview') {
    const cardsHtml = dataObj
      .map((recipe) => replaceTemplate(tempCard, recipe))
      .join('');

    const output = tempOverview.replace('{%RECIPE_CARDS%}', cardsHtml);

    res.writeHead(200, { 'Content-type': 'text/html' });
    res.end(output);
  } else if (pathname === '/recipe') {
    const recipe = dataObj[query.id];
    const output = replaceTemplate(tempRecipe, recipe);

    res.writeHead(200, { 'Content-type': 'text/html' });
    res.end(output);
  } else if (pathname === '/api') {
    res.writeHead(200, { 'content-type': 'application/json' });
    res.end(data);
  } else {
    res.writeHead(400, { 'Content-type': 'text/html' });
    res.end('<h1>Page not found</h1>');
  }
});

server.listen(8000, '127.0.0.1', () => {
  console.log('Listen from port 8000');
});
