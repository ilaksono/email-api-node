require('dotenv').config();
const app = require('express')();
const bodyParser = require('body-parser');

const PORT = 8001;
const api_key = process.env.MAILGUN_API_KEY;

const mailgun = require("mailgun-js");
const DOMAIN = process.env.DOMAIN_ADDRESS;
const mg = mailgun({ apiKey: api_key, domain: DOMAIN });
const data = {
  from: 'Excited User <brotherlaksono@gmail.com>',
  to: 'ianlaksono@gmail.com',
  subject: 'Hello',
  text: 'Testing some Mailgun awesomness!'
};
mg.messages().send(data, function (error, body) {
  console.log(body, error);
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

app.listen(PORT, () => console.log('listening' + PORT));