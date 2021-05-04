import App from './App';
import React from 'react';
import { StaticRouter } from 'react-router-dom';
import express from 'express';
import { renderToString } from 'react-dom/server';
import { Helmet } from 'react-helmet';

const assets = require(process.env.RAZZLE_ASSETS_MANIFEST);

const cssLinksFromAssets = (assets, entrypoint) => {
  return assets[entrypoint] ? assets[entrypoint].css ?
  assets[entrypoint].css.map(asset=>
    `<link rel="stylesheet" href="${asset}">`
  ).join('') : '' : '';
};

const jsScriptTagsFromAssets = (assets, entrypoint, extra = '') => {
  return assets[entrypoint] ? assets[entrypoint].js ?
  assets[entrypoint].js.map(asset=>
    `<script src="${asset}"${extra}></script>`
  ).join('') : '' : '';
};

const server = express();
server
  .disable('x-powered-by')
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR))
  .get('/*', (req, res) => {
    const context = {};
    const markup = renderToString(
      <StaticRouter context={context} location={req.url}>
        <App />
      </StaticRouter>
    );

    const helmet = Helmet.renderStatic();

    if (context.url) {
      res.redirect(context.url);
    } else {
      res.status(200).send(
        `<!doctype html>
    <html lang="en" ${helmet.htmlAttributes.toString()}>
    <head>
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta charset="utf-8" />
        ${helmet.title.toString()}
        <meta name="viewport" content="width=device-width, initial-scale=1">
        ${helmet.meta.toString()}
        ${helmet.link.toString()}
        <script data-ad-client="ca-pub-0582294658998240" async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
        ${cssLinksFromAssets(assets, 'client')}
        <!-- Global site tag (gtag.js) - Google Analytics -->
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-BMNKL36153"></script>
        <script>
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-BMNKL36153');
        </script>
    </head>
    <body ${helmet.bodyAttributes.toString()}>
        <div id="root">${markup}</div>
        ${jsScriptTagsFromAssets(assets, 'client', ' defer crossorigin')}
    </body>
</html>`
      );
    }
  });

export default server;
