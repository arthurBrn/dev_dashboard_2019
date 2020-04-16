const express = require('express');
const bodyParser = require('body-parser');
const pool = require('../src/db');

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

module.exports = router;