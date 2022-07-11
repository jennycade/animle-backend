var express = require('express');
var router = express.Router();

const User = require('../models/user');
const Game = require('../models/game');
const Target = require('../models/target');

const userController = require('../controllers/userController');
const gameController = require('../controllers/gameController');
const animalController = require('../controllers/animalController');

router.post('/', async function(req, res, next) {
  /*
  creates user, returns {userId} and status 201
  */
  try {
    const user = await User.create({games: []});
    res.status(201).json({userId: user._id});
  } catch (err) {
    return next(err);
  }
});

router.get('/:userId',
  userController.validateObjectId,
  async function(req, res, next) {
    /*
    check for valid userId
    returns 204 (user found) or 404 (user not found)
    */
    try {
      const user = await User.findById(req.params.userId).exec();
      if (!user) {
        const err = new Error('User not found');
        err.status = 404;
        throw err;
      }
      res.status(204).send();
    } catch (err) {
      return next(err);
    }
  }
);

router.get('/:userId/stats', async function(req, res, next) {
  /*
  returns user stats: # games played, % won, current streak, max streak, # guesses histogram
  */
  try {
    res.status(404).send();
  } catch (err) {
    return next(err);
  }
});

router.get('/:userId/games/', 
  userController.validateObjectId,
  async function(req, res, next) {
    /*
    check server time and user’s game. return info to populate gameboard:
    - already won
    - prevGuesses
    - no guesses
    x time for next game
    */
    try {
      // check for current game
      // current target
      const today = new Date();
      const target = await Target.findOne({
        date: `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`,
      }).exec();
      let game = await Game.findOne({
        target: target._id,
        user: req.params.userId,
      }).exec();

      // no game? create it
      if (!game) {
        game = await Game.create({
          user: req.params.userId,
          target: target._id,
          won: false,
          guesses: [],
        });
      }

      // return gameboard info
      res.json(game);
    } catch (err) {
      return next(err);
    }
  }
);

router.post('/:userId/games/:gameId/guesses/:animalId',
  animalController.validateObjectId,
  gameController.validateObjectId,
  userController.validateObjectId,
  gameController.validateGameIsCurrent,

  async function(req, res, next) {
    /*
    respond with:
    - error:
      - invalid guess
      - already guessed
      - already won
      - game not current
      - server error
    - win
    - years
    */
    try {
      // get the game. TODO: pull from res.locals
      const game = await Game.findById(req.params.gameId).exec();
      if (game.won) {
        const err = new Error('Game already won');
        err.status(400);
        throw(err);
      }
      if (game.guesses.some((guess) => guess.animal === req.params.animalId)) {
        const err = new Error('Species already guessed');
        err.status(400);
        throw(err);
      }

      // find time since recent common ancestor
      // TODO
      
    } catch (err) {
      return next(err);
    }
  }
);

module.exports = router;