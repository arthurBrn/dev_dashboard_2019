const express = require('express')
// const mysql = require('mysql');
const mariadb = require('mariadb');
const cors = require('cors');
const bodyParser = require('body-parser');
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





const connection = mariadb.createConnection({
    // host: '127.0.0.1',
    host: 'database',
    user: 'monty',
    password: 'monty',
    database: 'dashboard',
    port: '3306',
    //socketPath: '/var/run/mysqld/mysqld.sock'
}).then(conn => {
    console.log('DATABASE CONNECTION ESTABLISHED.');
}).catch(err => {
    console.log(err);
});

app.listen(8080);
