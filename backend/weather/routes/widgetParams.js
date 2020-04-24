const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const pool = require('../src/db');
const jwt = require('jsonwebtoken');

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

router.get('/', (req, res) => {
   pool.getConnection().then((conn) => {
       conn.query('SELECT * FROM widget_params')
           .then((result) => {
               if (result) {
                   res.status(200).json(result);
                   conn.release();
               } else {
                   res.json({
                       code: 404,
                       success:'No params in the database.'
                   });
                   conn.release();
               }
           }).catch((err) => {
          console.log('Query error on /GET widgetParams : ' + err);
          res.json(500).send(err);
       });
   }).catch((err) => {
      console.log('Connection error on /GET widgetParams : ' + err);
      res.json(500).send(err);
   });
});

router.post('/add', (req, res) => {
    pool.getConnection().then((conn) => {
        conn.query(
            'INSERT INTO widget_params (country, city, api_key, hours) VALUES (?,?,?,?);',
            [req.body.country, req.body.city, req.body.apiKey, req.body.hours]
        ).then((result) => {
            if (result) {
                res.json({
                    code:201,
                    success: 'Paramas registered.',
                    paramsId: result.insertId
                });
                conn.release();
            } else {
                conn.release();
                console.log('Could not persist those parameters.');
                res.status(500).json('Parameters can not be persisted.');
            }
        }).catch((err) => {
            console.log('Query error while posting widget params : ' + err);
            res.status(500).json(err);
        });
    }).catch((err) => {
        console.log('Params request error pool connection : ' + err);
        res.status(500).json(err);
    })
});

router.put('/alter', (req, res) => {
    pool.getConnection().then((conn) => {
        conn.query(
            'UPDATE widget_params SET country = ?, city=?, api_key=?, hours=? WHERE id=? ;',
            [req.body.country, req.body.city, req.body.apiKey, req.body.hours, req.body.paramsId]
        ).then((result) => {
            if (result) {
                conn.release();
                res.json({
                    code:200,
                    success: 'Widget parameters updated',
                    paramsId: result.insertId
                });
            } else {
                conn.release();
                res.json({
                    code: 500,
                    success: 'Updating failed.'
                });
            }
        })
    }) .catch((err) => {
        res.status(500).json(err);
        console.log('Connection error method PUT of params' + err);
    });
});

router.delete('/delete', (req, res) => {
   pool.getConnection().then((conn) => {
       pool.getConnection().then((conn) => {
           conn.query(
               'DELETE FROM widget_params WHERE id =? ; ',
               [req.body.paramsId]
               ).then((result) => {
               if (result) {
                   conn.release();
                    res.json({
                        code:200,
                        success:'Item deleted.'
                    });
               } else {
                   conn.release();
                   res.json({
                       code: 404,
                       success: 'Could not delete this item. It may not exist or the id provided is not good.'
                   });
               }
           });
       }).catch((err) => {
           console.log('Query error on /delete widgetParams : ' + err);
           res.status(500).send(err);
       });
   }).catch((err) => {
      console.log('Connection error on /delete widgetParams : ' + err);
      res.status(500).send(err);
   });
});

module.exports = router;
