const express = require('express');
const bodyParser = require('body-parser');
const pool = require('../src/db');
const bcrypt = require('bcrypt');
const router = express.Router();
router.use(bodyParser.json());
const jwt = require('jsonwebtoken');

// Solution provisoire
// Token emptied out every time the server reload
let ourRefreshTokens = [];

router.get('/', (req, res) => {
  pool.getConnection().then((conn) => {
    conn.query('Select * from service')
    .then((result) => {
      res.status(200).json(result);
    }).catch((err) => {
      res.status(400).json(err);
      pool.release();
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
      res.status(200).json(result);
    }).catch((err) => {
      pool.release()
      console.log(err);
    })
  }).catch((err) => {
    console.log(err);
  })
})

function generateAccessToken(user) {
  return jwt.sign(user, process.env.SECRET_TOKEN, {expiresIn: '24h'});
}

function generateRefreshToken(user) {
  return jwt.sign(user, process.env.REFRESH_TOKEN);
}


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

router.get('/services', (req, res) => {
  pool.getConnection().then((conn) => {
    conn.query('Select * from service').then((result) => {
      res.status(200).json(result);
    }).catch((err) => {
      pool.release();
      res.status(400).json(err);
    });
  }).catch((err) => {
    console.log(err);
  });
});


router.post('/login', (req, res) => {
  pool.getConnection().then((conn) => {
    conn.query(
        'SELECT * FROM users WHERE mail = ? ;',
        [req.body.mail]
    ).then((result) => {
      if (result[0]) {
        bcrypt.compare(req.body.password, result[0].password, (err, respwd) => {
          if (respwd) {
            const user = {
              id: result[0].id,
              firstName: result[0].firstName,
              lastName: result[0].lastName,
              mail: result[0].mail,
              password: result[0].password
            }
            const accessToken = generateAccessToken(user);
            const refreshToken = generateRefreshToken(user);
            // technically here we would add refresh token to db or smthg
            ourRefreshTokens.push(refreshToken);
            res.json({
              code: 200,
              success: 'login successfull',
              accessToken: accessToken,
              refreshToken: refreshToken,
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
      pool.release();
      console.log(err);
    });
  }).catch((err) => {
    console.log(err);
  })
});

router.post('/register', (req, res) => {
  bcrypt.hash(req.body.password, 0, (err, hash) => {
    pool.getConnection().then((conn) => {
      conn.query(
          'INSERT INTO users (first_name, last_name, mail, password) VALUES (?,?,?,?);',
          [req.body.firstName, req.body.lastName, req.body.mail, hash]
      ).then((result) => {
        if (result) {
          res.json({
            code: 200,
            success: 'Registration successfull',
          })
        } else {
          res.json({
            code: 404,
            success: 'Registration failed. Contact managment',
          })
        }
      }).catch((err) => {
        pool.release();
        console.log(err);
      }).catch((err) => {
        console.log(err);
      });
    });
  });
});

router.post('/token', (req, res) => {
  const refreshToken = req.body.token;
  // If we got no refresh token
  if (null === refreshToken) return res.sendStatus(401);
  // We received a non registered refresh token
  if (!ourRefreshTokens.includes(refreshToken)) return res.sendStatus(403);
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN, (err, user) => {
    if (err) return res.sendStatus(403);
    const accessToken = generateAccessToken(user);
    return res.json({
      code: 200,
      accessToken: accessToken,
    })
  })
});git push --set-upstream origin 47-create-crypto-viewgit push --set-upstream origin 47-create-crypto-view

router.delete('/logout', (req, res) => {
  // On va vérifier que, dans le tableau qui contient nos refreshTokens, on a pas de refreshToken
  //   similaire à celui passé en paramètre. Si on en trouve un, on le supprime.
  ourRefreshTokens = ourRefreshTokens.filter(token => token !== req.body.token);
  res.sendStatus(204).send('Refresh token deleted successfully.');
});

module.exports = router;
