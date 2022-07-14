const Node = require('../models/node');
const {validateObjectId} = require('../services/validateObjectId');

exports.validateObjectId = (req, res, next) => {
  const isValid = validateObjectId(req.params.nodeId);
  if (!isValid) {
    const err = new Error('Invalid node id');
    err.status = 400;
    return next(err);
  } else {
    next();
  }
}
