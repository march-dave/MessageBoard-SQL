'use strict';

var express = require('express');
var router = express.Router();

// cologs router
//
// root: /clogs/

// my model (keeper of the clogs)
// var Clog = require('../module/clog');

var clogs = ['clog1', 'clog2'];

// /api.clogs
router.get('/', (req, res) => {
  res.send(clogs);
});

router.get('/clogs', (req,res) => {
  res.send('clogs page');
});

router.post('/', (req, res) => {
  var newClog = req.body;

  res.send(newClog);
})


//
// // /api.clogs
// router.get('/', (req, res) => {
//   res.send(['clog1, clog2']);
// });

// clogs/fancy
router.get('/fancy', (req, res) => {
  res.send('only the fanciest clogs');
})

module.exports = router;

// $.ajax({
//   method:
//   data:
//   url:
// })

// $.post('/api/clogs', {type: 'wooden'})
// .done(....)
