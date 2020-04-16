var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.json);
var UserQueries = require('./usersRepository');

router.post('/login', (req, res) => {
    UserQueries.loginUser(req.body, (err, rows) => {
        if (err) {
            res.status(400).json(err);
        } else {
            res.send(rows);
        }
    });
});

router.get('/all', (req, res) => {
    UserQueries.getAllUsers((err, rows) => {
        if (err) {
            res.status(400).json(err);
        } else {
            res.send(rows);
            res.json(rows);
        }
    })
});

module.exports = router;
