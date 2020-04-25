const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const pool = require('../src/db');

const router = express.Router();
router.use(bodyParser.json());
// Solution provisoire
// Token emptied out every time the server reload
let ourRefreshTokens = [];

router.get('/', (req, res) => {
  pool.getConnection().then((conn) => {
    conn.query('Select * from service')
      .then((result) => {
        conn.release();
        res.status(200).json(result);
      }).catch((err) => {
        res.status(400).json(err);
        conn.release();
      });
  }).catch((err) => {
    console.log(err);
  });
});

router.post('/mail', (req, res) => {
  pool.getConnection().then((conn) => {
    conn.query(
      'SELECT * FROM users WHERE mail = ? ;',
      [req.body.mail],
    ).then((result) => {
      conn.release();
      res.status(200).json(result);
    }).catch((err) => {
      conn.release();
      console.log(err);
    });
  }).catch((err) => {
    console.log(err);
  });
});

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
  if (token === null) return res.status(401).send('You need to send a token with your request');

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
      conn.release();
      res.status(200).json(result);
    }).catch((err) => {
      conn.release();
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
      [req.body.mail],
    ).then((result) => {
      if (result[0]) {
        //conn.release();
        bcrypt.compare(req.body.password, result[0].password, (err, respwd) => {
          if (respwd) {
            const user = {
              id: result[0].id,
              firstName: result[0].firstName,
              lastName: result[0].lastName,
              mail: result[0].mail,
              password: result[0].password
            };
            const accessToken = generateAccessToken(user);
            const refreshToken = generateRefreshToken(user);
            // technically here we would add refresh token to db or smthg
            ourRefreshTokens.push(refreshToken);
            res.json({
              code: 200,
              success: 'login successfull',
              accessToken: accessToken,
              refreshToken: refreshToken,
              userId: user.id,
            });
          } else {
            conn.release();
            res.json({
              code: '404',
              success: 'Login failed. Wrong password.',
            });
          }
        });
      } else {
        conn.release();
        res.json({
          code: 404,
          success: 'No address mail match this one in the database.',
        });
      }
    }).catch((err) => {
      console.log(err);
    });
  }).catch((err) => {
    console.log(err);
  });
});

router.put('/store/refreshToken', (req, res) => {
  pool.getConnection().then((conn) => {
    conn.query(
      'UPDATE users SET refresh_token=? WHERE id=?;',
      [req.body.refreshToken, req.body.userId],
    ).then((result) => {
      if (result) {
        res.json({
          code: 200,
          success: 'User updated successfully.'
        });
        conn.release();
      } else {
        console.log('Encounter problem while updating data');
        res.status(500).json(result);
        conn.release();
      }
    }).catch((err) => {
      console.log('Query error in /store/refreshToken : ' + err);
      res.status(500).json(err);
    });
  }).catch((err) => {
    console.log('Connecion issue in /store/refresshToken : ' + err);
    res.status(500).json(err);
  });
});

router.post('/register', (req, res) => {
  console.log(req.body)
  bcrypt.hash(req.body.password, 0, (err, hash) => {
    pool.getConnection().then((conn) => {
      conn.query(
        'INSERT INTO users (first_name, last_name, mail, password, refresh_token) VALUES (?,?,?,?,?);',
        [req.body.firstName, req.body.lastName, req.body.mail, hash, ""],
      ).then((result) => {
        if (result) {
          conn.release();
          res.json({
            code: 200,
            success: 'Registration successfull',
            insertedId: result.insertId
          });
        } else {
          conn.release();
          res.json({
            code: 404,
            success: 'Registration failed. Contact managment',
          });
        }
      }).catch((error) => {
        console.log(error);
      }).catch((error) => {
        console.log(error);
      });
    });
  });
});

router.post('/refreshToken', (req, res) => {
  const refreshToken = req.body.token;
  // If we got no refresh token
  if (refreshToken === null) return res.sendStatus(401);
  // We received a non registered refresh token
  if (!ourRefreshTokens.includes(refreshToken)) return res.sendStatus(403);
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN, (err, user) => {
    if (err) return res.sendStatus(403);
    const accessToken = generateAccessToken(user);
    return res.json({
      code: 200,
      accessToken: accessToken,
    });
  });
});

router.get('/widgetList', (req, res) => {
  pool.getConnection().then((conn) => {
    conn.query('SELECT w.id, w.name, s.label, s.icon, w.public from services s, widget w where w.idService = s.id').then((result) => {
      res.status(200).json(result);
      conn.release();
    }).catch((err) => {
      console.log(err);
      res.status(400).json(err);
      conn.release();
    });
  }).catch((err) => {
    console.log(err);
  });
});



router.post('/insertToken', (req, res) => {
  pool.getConnection().then((conn) => {
    conn.query('INSERT INTO userdb.tokens (provider, token, idUser) VALUES(?, ?, ?)', 
    [req.body.provider, req.body.token, req.body.idUser],
    ).then((result) => {
      res.json(result);
      conn.release();
    }).catch((err) => {
      console.log(err);
      res.json(err);
      conn.release();
    });
  }).catch((err) => {
    console.log(err);
  });
});

router.put('/updateToken', authenticateToken, (req, res) => {
  console.log(req.user.id)
  pool.getConnection().then((conn) => {
    conn.query('UPDATE tokens SET token = ? where idUser = ? and provider = ?', 
    [req.body.token, req.user.id, req.body.provider],
    ).then((result) => {
      res.json(result);
      conn.release();
    }).catch((err) => {
      console.log(err);
      res.json(err);
      conn.release();
    });
  }).catch((err) => {
    console.log(err);
  });
});

router.delete('/logout', (req, res) => {
  ourRefreshTokens = ourRefreshTokens.filter((token) => token !== req.body.token);
  res.sendStatus(204).send('Refresh token deleted successfully.');
});

module.exports = router;
