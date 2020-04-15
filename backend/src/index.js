
const express = require('express')
const cors = require('cors');
const mariadb = require('mariadb/callback');
const listEndpoints = require('express-list-endpoints');
const bodyParser = require('body-parser');
const db = require('./db');
const app = express();

const usersRoutes = require('../routes/usersController');

app.use(
    bodyParser.urlencoded({
        extended: true
    })
);
app.use(cors());
app.use('/connect', usersRoutes);

app.get('/', (req, res) => {
    res.send('hello world');
});


const connection = mariadb.createConnection({
    host: 'database',
    user: 'monty',
    password: 'monty',
    database: 'dashboard',
    port: '3306',
});
/*
    .then(conn => {
        console.log('DATABASE CONNECTION ESTABLISHED.');
    }).catch(err => {
        console.log(err);
    });
*/


app.listen(8080, () => {
    console.log('SERVER LISTENING ON PORT 8080');
    console.log('DATABASE RANDOM QUERY: ');
    console.log(
        connection.query("SELECT * FROM users;", (err, rows) => {
          console.log(rows);
          connection.end();
        })
    );
    console.log('ROUTES : ');
    console.log(listEndpoints(app));
});
