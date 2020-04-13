const express = require('express')
const cors = require('cors');
const listEndpoints = require('express-list-endpoints');
const bodyParser = require('body-parser');
const db = require('./db');
const app = express();

const usersRoutes = require('../routes/usersController');

app.use(
    bodyParser.urlencoded({
        extended: true
    })
)
app.use(cors());
// We define the route we're using
app.use(usersRoutes);

app.get('/', (req, res) => {
    res.send('hello world');
});

/*
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
*/


app.listen(8080, () => {
    console.log('SERVER LISTENING ON PORT 8080');
    console.log('DATABASE RANDOM QUERY: ');
    console.log(db.query('SELECT * FROM users'));
    console.log('ROUTES : ');
    console.log(listEndpoints(app));
});
