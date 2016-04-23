'use strict';

var express = require('express');
var router = express.Router();

// api router
// root: /api


// /api/clogs
router.get('/clogs', (req, res) => {
  res.send('here is your users');
});

module.exports = router;
