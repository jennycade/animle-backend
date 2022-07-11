const Game = require('../models/game');
const {validateObjectId} = require('../services/validateObjectId');

exports.validateObjectId = (req, res, next) => {
  const isValid = validateObjectId(req.params.gameId);
  if (!isValid) {
    const err = new Error('Invalid game id');
    err.status = 400;
    return next(err);
  } else {
    next();
  }
}

exports.validateGameIsCurrent = async (req, res, next) => {
  // TODO: check DB
  next();
};
