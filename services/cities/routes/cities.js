var express = require('express');
var router = express.Router();
var mongo = require('mongodb').MongoClient;
let cities_controller = require('../controllers/cities');

let db;

mongo.connect('mongodb://localhost:27017/cities', (err, mongodb) => {
    if (err) throw err;
    console.log('DB connected');
    db = mongodb.db('cities');
});

router.get('/', function (req, res, next) {
    cities_controller.getCities(db, req, res);
});

router.post('/', function (req, res, next) {
    cities_controller.addCities(db, req, res);
});

module.exports = router;
