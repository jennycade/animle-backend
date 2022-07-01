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

// GET all species
router.get('/species', async function(req, res, next) {
  // TODO: consider cacheing
  try {
    // get the species names
    const animals = await Animal.find().sort('speciesName').exec();
    res.json(animals);
  } catch (err) {
    return next(err);
  }
});

// POST a guess
router.post('/guess', async function(req, res, next) {
  // check user
  // check game: make a game, continue a game, or game is over?
  // validate guess
  // check for guess in cache
  // calculate distance and add to cache
  // return distance and game condition
  res.json('blah');
});

// GET time to next game
router.get('/nextGameTime', async function(req, res, next) {
  res.json('blah');
});

module.exports = router;
