var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.json);
var Users = require('./users');

router.post('/login', (req, res) => {
    Users.loginUser(req.body, (err, rows) => {
        if (err) {
            res.status(400).json(err);
        } else {
            res.json(rows);
        }
    });
});

module.exports = router;
