const express = require('express')
const mysql = require('mysql');
const cors = require('cors')
var bodyParser = require('body-parser')
const app = express()
app.use(
  bodyParser.urlencoded({
    extended: true
  })
)
app.use(cors())

app.get('/', (req, res) => {
  res.send('hello world');
});



const connection = mysql.createConnection({
  host: 'localhost',
  user: 'monty',
  password: 'monty',
  database: 'dashboard'
});
connection.connect((err) => {
  if (err) throw err;
  console.log('Connected! to db');
});

app.listen(8080, () => console.log('Lauched on port 8080'));