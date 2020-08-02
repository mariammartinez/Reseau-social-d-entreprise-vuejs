const express = require('express');
const bodyParser = require('body-parser');
const model = require('./models/index');
const app = express();
const postRoutes = require('./routes/post');
const userRoutes = require('./routes/user');
const commentRoutes = require('./routes/comment');
const path = require('path'); 

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
app.use('/comment', commentRoutes);

app.use('/images', express.static(path.join(__dirname, 'images')));

module.exports = app;