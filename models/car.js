'use strict';

var db = require('../config/db');
var uuid = require('uuid');
// CREATE TABLE IF NOT EXISTS cars(id text, make text, model text, year integer)
db.run('CREATE TABLE IF NOT EXISTS cars(id text, make text, model text, year integer)');

exports.create = function(car, cb) {
  db.serialize(function() {
    var stmt = db.prepare("INSERT INTO cars VALUES (?, ?, ?, ?)");
    stmt.run(uuid(), car.make, car.model, car.year);
    stmt.finalize(cb);
  })
};

exports.findAll = function(cb) {
  db.all('SELECT * FROM cars', function(err, cars) {
    cb(err, cars);
  });
};

exports.findById = function(id, cb) {
  db.all(`SELECT * FROM cars WHERE ID = '${id}'`, function(err, cars) {
    cb(err, cars);
  });
};

exports.update = function(id, car, cb) {

  db.run(`UPDATE cars SET make = '${car.make}', model = '${car.model}', year = ${car.year} WHERE ID = '${id}'`, cb);
};

exports.removeById = function(id, cb) {
  db.all(`DELETE FROM  Cars  WHERE ID = '${id}'`, function(err, cars) {
    cb(err, cars);
  });
};
