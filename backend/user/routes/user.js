const express = require('express');
const bodyParser = require('body-parser');
const pool = require('../src/db');
const bcrypt = require('bcrypt');
const router = express.Router();
router.use(bodyParser.json());
const jwt = require('jsonwebtoken');

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
  if (null === token) return res.status(401).send('You need to send a token with your request');

  jwt.verify(token, process.env.SECRET_TOKEN, (err, ourUser) => {
    if (err) return res.status(403).send('Token no longer valid');
    // If we arrive here, our token is valid, we want to continue our operations
    req.user = ourUser;
    next();
  });
}


router.post('/login/jwt', (req, res) => {
  pool.getConnection().then((conn) => {
    conn.query(
        'SELECT * FROM users WHERE mail = ? ;',
        [req.body.mail]
    ).then((result) => {
      if (result) {
        bcrypt.compare(req.body.password, result[0].password, (err, respwd) => {
          if (respwd) {
            const user = {
              id: result[0].id,
              firstName: result[0].firstName,
              lastName: result[0].lastName,
              mail: result[0].mail,
              password: result[0].password
            }
            const accessToken = jwt.sign(user, process.env.SECRET_TOKEN);
            res.json({
              code: 200,
              success: 'login successfull',
              accessToken: accessToken
            });
          } else {
            res.json({
              code: '404',
              success: 'Login failed. Wrong password.'
            })
          }
        });
      } else {
        res.json({
          code: 404,
          success: 'No address mail match this one in the database.'
        });
      }
    }).catch((err) => {
      console.log(err);
    });
  }).catch((err) => {
    console.log(err);
  })
});

router.post('/register', (req, res) => {
  bcrypt.hash(req.body.password, 10, (err, hash) => {
    pool.getConnection().then((conn) => {
      conn.query(
          'INSERT INTO users (first_name, last_name, mail, password) VALUES (?,?,?,?);',
          [req.body.firstName, req.body.lastName, req.body.mail, hash]
      ).then((result) => {
        res.status(200).json(result);
      }).catch((err) => {
        console.log(err);
      }).catch((err) => {
        console.log(err);
      });
    });
  });
});

module.exports = router;
