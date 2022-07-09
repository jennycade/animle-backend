const user = require('../models/user');
const {validateObjectId} = require('../services/validateObjectId');

exports.validateObjectId = (req, res, next) => {
  const isValid = validateObjectId(req.params.userId);
  if (!isValid) {
    const err = new Error('Invalid user id');
    err.status = 400;
    return next(err);
  } else {
    next();
  }
}
