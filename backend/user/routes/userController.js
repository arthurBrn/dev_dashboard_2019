const express = require('express');
const bodyParser = require('body-parser');
const pool = require('../src/db');

const router = express.Router();
router.use(bodyParser.json());

router.get('/', (req, res) => {
  pool.getConnection().then((conn) => {
    conn.query('Select * from hello').then((result) => {
      console.log(result[0].id);
    }).catch((err) => {
      console.log(err);
    });
  }).catch((err) => {
    console.log(err);
  });
  res.send('Vous êtes au service user');
});

module.exports = router;
