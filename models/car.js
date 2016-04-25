'use strict';

var db = require('../config/db');
var uuid = require('uuid');
// CREATE TABLE IF NOT EXISTS cars(numid integer primary key autoincrement, id text, make text, model text, year integer);
db.run(`CREATE TABLE IF NOT EXISTS cars(
  numid integer primary key autoincrement,
  id text,
  make text,
  model text,
  year integer)`);

// exports.create = function(car, cb) {
//   // db.serialize(function() {
//   //   var stmt = db.prepare("INSERT INTO cars VALUES (?, ?, ?, ?)");
//   //   stmt.run(uuid(), car.make, car.model, car.year);
//   //   stmt.finalize(cb);
//   // })
//
//   db.run('INSERT INTO cars (id, make, model, year) VALUES (?, ?, ?, ?)',
//     uuid(),
//     car.make,
//     car.model,
//     car.year,
//     (err) => {
//       if(err) return cb(err);
//       // db.get('SELECT * FROM cars WHERE numid = (SELECT MAX (numid) FROM cars);', cb)
//       db.get('SELECT * FROM cars WHERE numid = (SELECT MAX (numid) FROM cars)', function(err, cars) {
//         cb(err, 'cars 111111');
//       });
//
//       // db.all('SELECT * FROM cars', function(err, cars) {
//       //   cb(err, cars);
//       // });
//     });
// };

exports.create = function(car, cb) {

  db.run('INSERT INTO cars (id, make, model, year) VALUES (?, ?, ?, ?)',
    uuid(),
    car.make,
    car.model,
    car.year,

    (err) => {

      if(err) return cb(err);

      db.get('SELECT * FROM cars WHERE numid = (SELECT MAX (numid) FROM cars);', cb)
      }
    );
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
  // db.all(`DELETE FROM  Cars  WHERE ID = '${id}'`, function(err, cars) {
  //   cb(err, cars);
  // });
  db.all(`DELETE FROM  Cars  WHERE ID = '${id}'`, (err, cars) => {
    if (err) return cb (err);

    db.get('SELECT * FROM cars', cb(err, cars) );
    // db.get('SELECT * FROM cars ORDER BY 1 DESC', function(err, cars) {
    //   // cb(err, cars);
    //   cb(err, cars);
    // } );
    // cb(err, cars);
  });

    // (err) => {
    //
    //    if(err) return cb(err);
    //
    //    db.get('SELECT * FROM todos WHERE ID = (SELECT MAX (ID) FROM todos);', cb)
    //
    //  });


};
