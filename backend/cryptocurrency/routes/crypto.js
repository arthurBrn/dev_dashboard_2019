const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');

const router = express.Router();
router.use(bodyParser.json());

/**
 * @param req
 * @param res
 * @param next
 * @returns {*}
 * Used as a midleware
 * Verify token send in the request
 * Add the user info to the request if token is valid
 */
function authenticateToken(req, res, next) {
  // Recover authentication token in the header
  const authHeader = req.headers['authorization'];
  // Saying : If we have a authHeader then return the token, that we take from the split
  const token = authHeader && authHeader.split(' ')[1];
  if (token === null) return res.status(401).send('You need to send a token with your request');

  jwt.verify(token, process.env.SECRET_TOKEN, (err, ourUser) => {
    if (err) return res.status(403).send('Token no longer valid');
    // If we arrive here, our token is valid, we want to continue our operations
    req.user = ourUser;
    next();
  });
}

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

router.get('/rate', (req, res) => {
  const requestUrl = 'https://api.coincap.io/v2/markets';
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
