const express = require('express')
// const mysql = require('mysql');
// const cors = require('cors');
// const bodyParser = require('body-parser');
const app = express();
/*app.use(
    bodyParser.urlEncoded({
      extended: true
    })
)
app.use(cors());*/



app.get('/', (req, res) => {
  res.send('hello world');
});

/*const connection = mysql.createConnection({
  host: 'localhost',
  user: 'monty',
  password: 'monty',
  database: 'dashboard',
});
connection.connect((err) => {
  if (err) {
    console.log('CONNECTION FAILED');
  }
  console.log('connected to db');
});*/

app.listen(8080);
