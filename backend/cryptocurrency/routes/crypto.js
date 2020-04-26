const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const jwt = require('jsonwebtoken');
const pool = require('../src/db');

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

router.post('/getCryptoRate', (req, res) => {
  const requestUrl = `https://api.coincap.io/v2/assets/${req.body.crypto}`;
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

router.post('/widgets', authenticateToken, (req, res) => {
  pool.getConnection().then((conn) => {
    let table = req.body.tableName;
    conn.query(
        `SELECT * FROM ${req.body.tableName} WHERE idUser = ${req.user.id} ;`,
    ).then((result) => {
      if (result) {
        conn.release();
        res.status(200).json(result);
      } else {
        conn.release();
        res.status(404).json(result);
      }
    }).catch((err) => {
      console.log('Query error in /crypto/widgets : ' + err);
      res.status(500).json(err);
    });
  }).catch((err) => {
    console.log('connection error in /crypto/widgets: ' + err);
    res.status(500).json(err);
  });
});

router.post('/insertGraph', authenticateToken, (req, res) => {
  pool.getConnection().then((conn) => {
    conn.query(
        'INSERT INTO graph (crypto, startGraph, endGrpah, idUser) select ?, ?, ?, ? where not exists (select crypto from graph where crypto = ?)',
        [req.body.crypto, req.body.start, req.body.end, req.user.id, req.body.crypto]
    ).then((result) => {
      if (result) {
        conn.release();
        res.status(200).json(result);
      } else {
        conn.release();
        res.status(404).json(result);
      }
    }).catch((err) => {
      console.log('Query error in insert graph : ' + err);
      res.status(500).json(err);
    });
  }).catch((err) => {
    console.log('connection error in insert graph: ' + err);
    res.status(500).json(err);
  });
});

router.get('/getGraph', authenticateToken, (req, res) => {
  pool.getConnection().then((conn) => {
    conn.query(
        'select * from graph where idUser = ?',
        [req.user.id]
    ).then((result) => {
      if (result) {
        conn.release();
        res.status(200).json(result);
      } else {
        conn.release();
        res.status(404).json(result);
      }
    }).catch((err) => {
      console.log('Query error in insert graph : ' + err);
      res.status(500).json(err);
    });
  }).catch((err) => {
    console.log('connection error in insert graph: ' + err);
    res.status(500).json(err);
  });
});

router.post('/deleteGraph', (req, res) => {
  pool.getConnection().then((conn) => {
    conn.query(
        'delete from graph where id = ?', [req.body.id]
    ).then((result) => {
      if (result) {
        conn.release();
        res.status(200).json(result);
      } else {
        conn.release();
        res.status(404).json(result);
      }
    }).catch((err) => {
      console.log('Query error in insert graph : ' + err);
      res.status(500).json(err);
    });
  }).catch((err) => {
    console.log('connection error in insert graph: ' + err);
    res.status(500).json(err);
  });
});

router.post('/insertRate', authenticateToken, (req, res) => {
  console.log(req.body.crypto)
  console.log(req.user.id)
  pool.getConnection().then((conn) => {
    conn.query(
        'INSERT INTO rate (crypto, idUser) select ?, ? where not exists (select crypto from rate where crypto = ?)',
        [req.body.crypto, req.user.id, req.body.crypto]
    ).then((result) => {
      if (result) {
        conn.release();
        res.status(200).json(result);
      } else {
        conn.release();
        res.status(404).json(result);
      }
    }).catch((err) => {
      console.log('Query error in insert rate : ' + err);
      res.status(500).json(err);
    });
  }).catch((err) => {
    console.log('connection error in insert rate: ' + err);
    res.status(500).json(err);
  });
});

router.get('/getDbRate', authenticateToken, (req, res) => {
  pool.getConnection().then((conn) => {
    conn.query(
        'select * from rate where idUser = ?',
        [req.user.id]
    ).then((result) => {
      if (result) {
        conn.release();
        res.status(200).json(result);
      } else {
        conn.release();
        res.status(404).json(result);
      }
    }).catch((err) => {
      console.log('Query error in insert rate : ' + err);
      res.status(500).json(err);
    });
  }).catch((err) => {
    console.log('connection error in insert rate: ' + err);
    res.status(500).json(err);
  });
});

router.post('/deleteRate',  authenticateToken, (req, res) => {
  pool.getConnection().then((conn) => {
    conn.query(
        'delete from rate where id = ?', [req.body.id]
    ).then((result) => {
      if (result) {
        conn.release();
        res.status(200).json(result);
      } else {
        conn.release();
        res.status(404).json(result);
      }
    }).catch((err) => {
      console.log('Query error in insert rate : ' + err);
      res.status(500).json(err);
    });
  }).catch((err) => {
    console.log('connection error in insert rate: ' + err);
    res.status(500).json(err);
  });
});

module.exports = router;













