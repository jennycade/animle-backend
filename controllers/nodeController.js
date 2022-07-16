const Node = require('../models/node');
const {validateUuid4} = require('../services/validateObjectId');

exports.validateObjectId = (req, res, next) => {
  const isValid = validateUuid4(req.params.nodeId);
  if (!isValid) {
    const err = new Error('Invalid node id');
    err.status = 400;
    return next(err);
  } else {
    next();
  }
}
