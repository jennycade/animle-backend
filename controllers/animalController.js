const Animal = require('../models/animal');
const {validateObjectId} = require('../services/validateObjectId');

exports.validateObjectId = (req, res, next) => {
  const isValid = validateObjectId(req.params.animalId);
  if (!isValid) {
    const err = new Error('Invalid animal id');
    err.status = 400;
    return next(err);
  } else {
    next();
  }
}
