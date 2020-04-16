const mariadb = require('mariadb/callback');
const express = require('express')
const cors = require('cors');
const listEndpoints = require('express-list-endpoints');
const bodyParser = require('body-parser');
const db = require('./db');
const app = express();
const jwt = require('jsonwebtoken');

app.use(express.json);
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

app.get('/', (req, res) => {
    res.send('hello world');
});
app.get('/users/all', (req, res) => {
    db.query("SELECT * FROM users;", (err, rows) => {
        res.send(rows);
        db.end;
    })
});

/*
app.post('/login', (req, res) => {
})
*/

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
