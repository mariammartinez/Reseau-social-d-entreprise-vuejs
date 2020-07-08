const express = require('express');
const bodyParser = require('body-parser');
const model = require('./models/index');
const app = express();
const postRoutes = require('./routes/post');
const userRoutes = require('./routes/user');


//CROSS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use(bodyParser.json());

app.use(function (req, res, next) {
   req.model = model;
    next();
});

app.use('/post', postRoutes);
app.use('/user', userRoutes);

module.exports = app;