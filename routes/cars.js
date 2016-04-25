'use strict';

var express = require('express');
var router = express.Router();

var Car = require('../models/car');

router.get('/', (req, res) => {

  Car.findAll(function(err, cars) {
    if(err) return res.status(400).send(err);
    res.send(cars);
  });
});

router.get('/:id', (req, res) => {
  var id = req.params.id;
  Car.findById(id, function(err, cars) {
    if(err || !cars) return res.status(400).send(err || 'Car not found.');
    res.send(cars);
  });
});

router.post('/', (req, res) => {
  Car.create(req.body, (err, car) => {
    if(err) return res.status(400).send(err);
    res.send(car);
  })
});

// delete
router.delete('/:id', (req, res) => {
  var id = req.params.id;
  Car.removeById(id, function(err, cars) {
    if(err) return res.status(400).send(err);
    res.send(cars);
  });
});

// update
router.put('/:id', (req, res) => {
  var id = req.params.id;
  Car.update(id, req.body, (err, car) => {
      if(err) return res.status(400).send(err);
      res.send(car);
  });
});

module.exports = router;
