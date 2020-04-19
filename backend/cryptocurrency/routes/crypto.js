const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');

const router = express.Router();
router.use(bodyParser.json());


router.get('/graph', (req, res) => {
  // console.log(req);
  const requestUrl = `http://api.coincap.io/v2/assets/${req.query.crypto}/history?interval=d1&start=${req.query.start}&end=${req.query.end}`;
  // console.log(requestUrl);
  const options = {
    method: 'GET',
    url: requestUrl,
    headers: {},
  };
  request(options, (error, response) => {
    if (error) throw new Error(error);
    res.json(JSON.parse(response.body));
  });
});

module.exports = router;
