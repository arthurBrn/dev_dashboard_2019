const express = require('express');
const bodyParser = require('body-parser');
const pool = require('../src/db');
const bcrypt = require('bcrypt');

const router = express.Router();
router.use(bodyParser.json());

router.get('/', (req, res) => {
  pool.getConnection().then((conn) => {
    conn.query('Select * from service').then((result) => {
      res.status(200).json(result);
    }).catch((err) => {
      res.status(400).json(err);
    });
  }).catch((err) => {
    console.log(err);
  });
});

router.post('/mail', (req, res) => {
  pool.getConnection().then((conn) => {
    conn.query(
        'SELECT * FROM users WHERE mail = ? ;',
        [req.body.mail]
    ).then((result) => {
      res.status(200).json(result)
    }).catch((err) => {
      console.log(err);
    })
  }).catch((err) => {
    console.log(err);
  })
})

router.post('/login', (req, res) => {
  pool.getConnection().then((conn) => {
    conn.query(
        'SELECT * FROM users WHERE mail = ? AND password = ? ;',
        [req.body.mail, req.body.password],
    ).then((result) => {
      res.status(200).json(result);
    }).catch((err) => {
      console.log(err);
    });
  }).catch((err) => {
    console.log(err);
  });
});

router.post('/register', (req, res) => {
  pool.getConnection().then((conn) => {
    conn.query(
        'INSERT INTO users (first_name, last_name, mail, password) VALUES (?,?,?,?);',
        [req.body.firstName, req.body.lastName, req.body.mail, req.body.password]
    ).then((result) => {
      res.status(200).json(result);
    }).catch((err) => {
      console.log(err);
    });
  }).catch((err) => {
    console.log(err);
  });
});

module.exports = router;
