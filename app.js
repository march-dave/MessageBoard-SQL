'use strict';

const PORT = process.env.PORT || 3000;
var express = require('express');
var path = require('path');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));

// app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// app.get('/', (req, res) => {
  // res.send('GET /');
  // res.render('index', {title: '' , body: "Body"});
// });

app.get('/', require('./routes/index'));

app.use('/api', require('./routes/api'));
app.use('/clogs', require('./routes/clogs'));

app.listen(PORT, err => {
  console.log(err || `Server listening on port ${PORT}`);
});
