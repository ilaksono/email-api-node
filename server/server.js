// import React from 'react';
require('dotenv').config();
import 'babel-polyfill';
// import 'babel-core/register';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import App from '../src/App';
import EmailView from '../src/views/EmailView';
import { StaticRouter } from 'react-router';
import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import fs from 'fs';
// import mailgun from 'mailgun-js';
const app = express();
const mailgun = require("mailgun-js");
const PORT = process.env.PORT || 8001;

const api_key = process.env.MAILGUN_API_KEY;
const DOMAIN = process.env.DOMAIN_ADDRESS;

// app.use('^/$', (req, res, next) => {
//   fs.readFile(path.resolve('./public/index.html'), 'utf-8', (err, data) => {
//     if (err) {
//       console.log(err);
//       return res.status(500).send('could not load index');
//     }
//     return res.send(data.replace(`<div id='root'></div>`,
//       `<div id='root'>${ReactDOMServer
//         .renderToString(<App />)}</div>`));
//   });
// });
app.use(bodyParser.json());
// app.use(express.static(path.resolve(__dirname, '..', 'build', 'public')));
app.use(express.static('build/public'));
// app.get('/email', (req, res) => {
//   fs.readFile(path.resolve('./public/index.html'), 'utf-8', (err, data) => {
//     if (err) {
//       console.log(err);
//       return res.status(500).send('could not load index');
//     }
//     return res.send(data.replace(`<div id='root'></div>`,
//       `<div id='root'>${ReactDOMServer
//         .renderToString(<EmailView />)}</div>`));
//   });
// });

app.get('*', (req, res) => {
  const context = {};
  const content = ReactDOMServer.renderToString(
    <StaticRouter context={context} location={req.url}>
      <EmailView />
    </StaticRouter>
  );
  const html = `
  <html>
    <head>
    <link
    rel="stylesheet"
    href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css"
    integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk"
    crossorigin="anonymous"
  />
  <link rel="stylesheet" href="EmailView.css"
    </head>
    <body>
    <div id='root'>
    ${content}
    </div>
    <script src="client_bundle.js"></script>

    </body>
  </html>
  `;

  res.send(html);
});

// const domain = process.env.MAILGUN_DOMAIN_ADD;
// const mailgun = require('mailgun-js')({ apiKey: api_key, domain: domain });

// const data = {
//   from: `Ian L <postmaster@${process.env.MAILGUN_DOMAIN_ADD}>`,
//   to: 'ianlaksono@gmail.com',
//   subject: 'Hello',
//   text: 'Testing some Mailgun awesomeness!'
// };


// app.use(bodyParser.urlencoded({ extended: true }));
// app.set("view engine", "ejs");

// app.get('/', (req, res) => {
//   res.render('index_page');
// });
// app.get('/mail', async (req, res) => {
//   console.log('hi');
//   await mailgun.messages().send(data, function (error, body) {
//     console.log(body);
//   });
//   res.send('mailed');

// });

app.post('/email', (req, res) => {
  
  const mg = mailgun({ apiKey: api_key, domain: DOMAIN });
  const data = {
    from: req.body.email || 'Lakso-noreply <ianlaksono@gmail.com>',
    to: 'brotherlaksono@gmail.com',
    subject: `Yo Ian What\'s Goood - ${req.body.name}`,
    text: req.body.text
  };
  mg.messages().send(data, function (error, body) {
    // console.log(body, error);
  });
  res.status(200);
});



app.listen(PORT, () => console.log('listening' + PORT));