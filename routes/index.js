var express = require('express');
var router = express.Router();

var Animal = require('../models/animal');

// routes
// get gameboard state
// post guess
// log in
// get user stats
// get species list (for filterable list)

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('send a resource');
});

router.get('/species', async function(req, res, next) {
  try {
    // get the species names
    const animals = await Animal.find().sort('speciesName').exec();
    res.json(animals);
  } catch (err) {
    return next(err);
  }
});

router.post('/guess')

module.exports = router;
