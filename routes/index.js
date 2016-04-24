'use strict';

var express = require('express');
var router = express.Router();

var Car = require('../models/car');

// router.get('/', (req, res) => {
//
//   Car.findAll(function(err, cars) {
//     if(err) return res.status(400).send(err);
//     res.send(cars);
//   });
// });

//  GET /
router.get('/', (req, res) => {
  Car.findAll((err, cars) => {
    if(err) {
      res.render('error', {error: err})
    } else {

      console.log('cars: ', cars);

      res.render('index', {cars: cars});
    }
  })
});

module.exports = router;
