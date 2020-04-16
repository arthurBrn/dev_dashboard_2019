const express = require('express');
const path = require('path');
require('dotenv').config({
  path: path.resolve(__dirname, '.env'),
});

const app = express();

app.get('/', (req, res) => {
  res.setHeader('Content-Type', 'text/plain');
  res.send('Vous êtes à l\'accueil');
});
app.listen({
  port: process.env.PORT,
}, () => {
  console.log(`🚀 Server ready at http://localhost:${process.env.PORT}`);
});
