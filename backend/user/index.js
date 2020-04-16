const express = require('express');
const path = require('path');
require('dotenv').config({
  path: path.resolve(__dirname, '.env'),
});
const bodyParser = require('body-parser');
const cors = require('cors');
const userController = require('./routes/userController');
const pool = require('./src/db');

const app = express();
app.use(cors());
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);

app.use('/user', userController);

app.get('/', (req, res) => {
  console.log('here');
  console.log(pool.host);
  res.send('Connecté au user service');
});

app.listen({
  port: process.env.PORT,
}, () => {
  console.log(`🚀 Server ready at http://localhost:${process.env.PORT}`);
});
