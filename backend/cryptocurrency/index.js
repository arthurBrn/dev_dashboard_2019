const express = require('express');
const path = require('path');
require('dotenv').config({
  path: path.resolve(__dirname, '.env'),
});
const listEndPoints = require('express-list-endpoints');
const bodyParser = require('body-parser');
const cors = require('cors');
const crypto = require('./routes/crypto');

const app = express();
app.use(cors());
app.use(
    bodyParser.urlencoded({
        extended: true,
    }),
)
app.use('/crypto', crypto);

app.get('/', (req, res) => {
  res.setHeader('Content-Type', 'text/plain');
  res.send('Vous êtes à crypto');
});
app.listen({
  port: process.env.PORT,
}, () => {
  console.log(`🚀 Server ready at http://localhost:${process.env.PORT}`);
  console.log(listEndPoints(crypto));
});
