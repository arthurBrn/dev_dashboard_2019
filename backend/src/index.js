const mariadb = require('mariadb/callback');
const express = require('express')
const cors = require('cors');
const listEndpoints = require('express-list-endpoints');
const bodyParser = require('body-parser');
const db = require('./db');
const app = express();

const usersRoutes = require('../routes/usersController');


app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());
app.use('/user', usersRoutes);

app.get('/', (req, res) => {
    res.send('hello world');
});

app.get('/myusers', (req, res) => {
    db.query('select * from users', (err, rows) => {
        //console.log(rows);
        res.send(rows);
        db.end;
    })
});

app.get('/loginUsers', (req, res) => {
    db.query(
        'SELECT * FROM users WHERE email = ' + req.param('email') + ' AND password = ' + req.param('password') + ';',
        (err, rows) => {
            res.send(rows);
            db.end;
        }
    );
})

app.listen(8080, () => {
    console.log('SERVER LISTENING ON PORT 8080');
    console.log(
        db.query("SELECT * from users;", (err, rows) => {
            console.log(rows);
            db.end;
        })
    )
    console.log(listEndpoints(app));
});
