const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');

const router = express.Router();
router.use(bodyParser.json());


router.get('/graph', (req, res) => {
  const requestUrl = `https://api.coincap.io/v2/assets/${req.query.crypto}/history?interval=d1&start=${req.query.start}&end=${req.query.end}`;
  const options = {
    method: 'GET',
    url: requestUrl,
  };
  request(options, (error, response) => {
    if (error) throw new Error(error);
    res.json(JSON.parse(response.body));
  });
});

router.get('/list', (req, res) => {
  const requestUrl = 'https://api.coincap.io/v2/assets';
  const options = {
    method: 'GET',
    url: requestUrl,
  };
  request(options, (error, response) => {
    if (error) throw new Error(error);
    res.json(JSON.parse(response.body));
  });
});

module.exports = router;
