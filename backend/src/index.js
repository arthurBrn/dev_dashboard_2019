const express = require('express')
// const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');

const pool = require('./db');

const app = express();
app.use(
    bodyParser.urlencoded({
        extended: true
    })
)
app.use(cors());



app.get('/', (req, res) => {
    res.send('hello world');
});

pool.getConnection().then((conn) => {
  conn.query('Select * from hello').then((res) => {
    console.log(res);
  }).catch((err) => {
    console.log(err);
  });
}).catch((err) => {
  console.log(err)
});
app.listen(8080);
