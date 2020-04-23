const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');

const router = express.Router();
router.use(bodyParser.json());

router.get('/airquality/current', (err, res) => {
    const requestUrl =  `https://api.weatherbit.io/v2.0/current/airquality?city=${req.query.city}&country=${req.query.country}&key=${req.query.apiKey}`
    const options = {
        method: 'GET',
        url: requestUrl,
    };
    request(options, (error, response) => {
        if (error) throw new Error(error);
        res.json(JSON.parse(response.body));
    });
});

router.get('/airquality/forecast', (err, res) => {
    const reqUrl = `https://api.weatherbit.io/v2.0/current/airquality?city=${req.query.city}&country=${req.query.country}&key=${req.query.apiKey}`
    const options = {
        method: 'GET',
        url: reqUrl,
    };
    request(options, (error, response) => {
        if (error) throw new Error(error);
        res.json(JSON.parse(response.body));
    });
});

router.get('/forecast/zeroToSixteenDays', (err, res) => {
    const reqUrl = `https://api.weatherbit.io/v2.0/forecast/daily?city=${req.query.city}&country=${req.query.country}&key=${req.query.apiKey}`
    const options = {
        method: 'GET',
        url: reqUrl,
    };
    request(options, (error, response) => {
        if (error) throw new Error(error);
        res.json(JSON.parse(response.body));
    });
});

router.get('/forecast/hours', (err, res) => {
    const reqUrl = `https://api.weatherbit.io/v2.0/forecast/hourly?city=${req.query.city}&key=${req.query.apiKey}&hours=${req.query.hours}`
    const options = {
        method: 'GET',
        url: reqUrl,
    };
    request(options, (error, response) => {
        if (error) throw new Error(error);
        res.json(JSON.parse(response.body));
    });
});
