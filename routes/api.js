'use strict';

var express = require('express');
var router = express.Router();

router.use('/cars', require('./cars'));

module.exports = router;
