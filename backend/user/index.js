const express = require('express');
const path = require('path');
require('dotenv').config({
  path: path.resolve(__dirname, '.env'),
});
const listEndPoints = require('express-list-endpoints');
const bodyParser = require('body-parser');
const cors = require('cors');
const user = require('./routes/user');

const app = express();
app.use(cors());
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);

app.use('/user', user);

app.get('/', (req, res) => {
  console.log('here and there');
  res.send('Connecté au user service');
});

app.listen({
  port: process.env.PORT_USER_SERVICE,
}, () => {
  console.log(`🚀 Server ready at http://localhost:${process.env.PORT_USER_SERVICE}`);
  console.log(listEndPoints(user));
});
