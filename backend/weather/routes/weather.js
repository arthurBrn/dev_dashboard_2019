const express = require('express');
const bodyParser = require('body-parser');
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

router.get('/widgets', (req, res) => {
    pool.getConnection().then((conn) => {
        conn.query('SELECT * FROM weather_widget').then((result) => {
            res.status(200).json(result);
            conn.release();
        }).catch((err) => {
            res.status(500).json(err);
            conn.release();
        })
    }).catch((err) => {
       console.log('Pool getConnection error : ' + err);
    });
});

router.post('/widget', (req, res) => {
   pool.getConnection().then((conn) => {
        conn.query(
            'INSERT INTO weather_widget (name, description, timer, service_id, weather_widget_params_id) VALUES (?,?,?,?,?)',
            [req.body.widgetName, req.body.widgetDescription, req.body.widgetTimer, req.body.widgetServiceId, req.body.widgetParamsId]
        ).then((result) => {
            if (result) {
                conn.release();
                res.status(200).json({
                    success: 'Widget created.',
                    weatherWidgetId: result.insertId
                });
            } else {
                conn.release();
                res.status(404).json({
                    success: 'Can not POST this widget.'
                })
            }
        }).catch((err) => {
            console.log('Callback error on widgets POST : ' + err);
            conn.release();
            res.status(500).json(err);
        });
   }).catch((err) => {
      res.status(500).json(err);
   });
});

router.post('/params', (req, res) => {
    pool.getConnection().then((conn) => {
        console.log('BODY : ' + req.body.country);
        conn.query(
            'INSERT INTO weather_widget_params (country, city, hours, api_key) VALUES (?,?,?,?);',
            [req.body.country, req.body.city, req.body.hours, req.body.apiKey]
        ).then((result) => {
            if (result) {
                console.log('RESULT : ' + result);
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

module.exports = router;

