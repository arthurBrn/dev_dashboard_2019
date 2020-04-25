const express = require('express');
const endpoints = require('express-list-endpoints');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
require('dotenv').config({
  path: path.resolve(__dirname, '.env'),
});

const weatherWidgetRoutes = require('./routes/weatherWidget');
const weatherApiRoutes = require('./routes/weatherApi');
const app = express();

app.use(cors());
app.use(
    bodyParser.urlencoded({
      extended:true,
    }),
);
app.use('/weather', weatherWidgetRoutes);
app.use('/weather/api', weatherApiRoutes);

app.get('/', (req, res) => {
  res.setHeader('Content-Type', 'text/plain');
  res.send('Vous êtes à la météo');
});
app.listen({
  port: process.env.PORT_WEATHER_SERVICE,
}, () => {
  console.log(`🚀 Server ready at http://localhost:${process.env.PORT_WEATHER_SERVICE}`);
  console.log(endpoints(weatherWidgetRoutes));
  console.log(endpoints(weatherApiRoutes));
});


