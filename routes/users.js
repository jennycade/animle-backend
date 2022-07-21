var express = require('express');
var router = express.Router();

const User = require('../models/user');
const Game = require('../models/game');
const Target = require('../models/target');

const userController = require('../controllers/userController');
const gameController = require('../controllers/gameController');
const nodeController = require('../controllers/nodeController');

// get all users - dev only
router.get('/', async function(req, res, next) {
  try {
    const users = await User.find().exec();
    res.json(users);
  } catch (err) {
    return next(err);
  }
});

// register new user
router.post('/', async function(req, res, next) {
  /*
  creates user, returns {userId} and status 201
  */
  try {
    const user = await User.create({games: []});
    res.status(201).json(user);
  } catch (err) {
    return next(err);
  }
});

// validate user
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
  TODO
  */
  try {
    res.status(404).send();
  } catch (err) {
    return next(err);
  }
});

// get today's game
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
      const todayString = today.toISOString().slice(0, 10);
      const target = await Target.findOne({
        date: todayString,
      }).exec();
      
      if (!target) {
        const err = new Error(`No target found for today (${todayString})`);
        err.status = 404;
        throw err;
      }

      let game = await Game.findOne({
        // TODO: fix error - TypeError: Game.findOne is not a function
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

router.post('/:userId/games/:gameId/guesses/:nodeId',
  nodeController.validateObjectId,
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
      const game = await Game.findById(req.params.gameId)
        .populate('target')
        .exec();
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

      // check cache in target
      // TODO

      // find time since recent common ancestor
      const guessNode = await Node.findById(req.params.animalId).exec();
      if (!guessNode) {
        const err = new Error('Invalid guess');
        err.status = 404;
        throw err;
      }
      const commonAncestor = nodeController.findCommonAncestor(
        guessNode,
        game.target
      );

      // add to target cache
      // TODO

      // won?
      if (commonAncestor.yearsSinceAncestor === 0) {
        // TODO
      }

      res.json(commonAncestor);
      
    } catch (err) {
      return next(err);
    }
  }
);

module.exports = router;