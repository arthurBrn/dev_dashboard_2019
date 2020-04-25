const express = require('express');
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


router.post('/widgets', authenticateToken, (req,res) => {
    pool.getConnection().then((conn) => {
        conn.query(
            `SELECT * FROM ${req.body.tableName} WHERE idUser = ?`,
            [req.user.id]
        ).then((result) => {
            if (result) {
                conn.release();
                res.status(200).json(result);
            } else {
                conn.release();
                res.status(404).json(err);
            }
        }).catch((err) => {
            conn.release();
            console.log('Query error in /widgets : ' + err);
            res.status(500).json(err);
        })
    }).catch((err) => {
        console.log('Connection error in /widgets : ' + err);
        res.status(500).json(err);
    });
});

router.post('/add', (req, res) => {
    pool.getConnection().then((conn) => {
        conn.query(
            'INSERT INTO widget (name, timer, user_id, parameters_id) VALUES (?,?,?,?)',
            [req.body.name, req.body.timer, req.body.userId, req.body.paramsId]
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

router.put('/alter', (req, res) => {
    pool.getConnection().then((conn) => {
        conn.query(
            'UPDATE widget SET name=?, timer=?, user_id=?, parameters_id=? WHERE id=?;',
            [req.body.name, req.body.timer, req.body.userId, req.body.paramsId, req.body.widgetId]
        ).then((result) => {
            if (result) {
                conn.release();
                res.json({
                    code:200,
                    success:'Widget updated.'
                });
            } else {
                conn.release();
                res.json({
                    code:404,
                    success:'An error happened.'
                });
            }
        }).catch((err) => {
            console.log('Error on /alter weatherWidget : ' + err);
            res.status(500).send(err);
        });
    }).catch((err) => {
        console.log('Connection issue on /alter weatherWidget : ' + err);
        res.status(500).send(err);
    });
});

router.delete('/delete', (req,res) => {
    pool.getConnection().then((conn) => {
        conn.query(
            'DELETE FROM widget WHERE id=?;',
            [req.body.widgetId]
        ).then((result) => {
            if (result) {
                conn.release();
                res.json({
                    code:200,
                    sucess:'Widget deleted.'
                });
            } else {
                conn.release();
                res.json({
                    code:'404',
                    success:'Something went wrong.'
                });
            }
        }).catch((err) => {
            console.log('Querry error on /delete weatherWidget : ' + err);
            res.status(500).send(err);
        });
    }).catch((err) => {
        console.log('Error on /delete weatherWidget : ' + err);
        res.status(500).send(err);
    });
});


module.exports = router;
