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

exports.findCommonAncestor = (guessNode, targetNode) => {
  // returns id of most common recent ancestor and years 
  // separating the two nodes
  
  const guessAncestors = guessNode.lineage.map(a => a.ancestor);
  const targetAncestors = targetNode.lineage.map(a => a.ancestor);
  // TODO: confirm that lineage is guaranteed to be sorted oldest
  // to youngest
  const result = {};
  for (let i=guessAncestors.length - 1; i>=0; i--) {
    if (targetAncestors.includes(guessAncestors[i])) {
      result.ancestor = guessAncestors[i];
      // found most common recent ancestor
      const guessToCommonAncestorYears = guessNode.lineage.find(
        (a) => a.yearsSinceAncestor
      );
      const targetToCommonAncestorYears = targetNode.lineage.find(
        (a) => a.yearsSinceAncestor
      );
      result.yearsSinceAncestor = Math.max(
        guessToCommonAncestorYears,
        targetToCommonAncestorYears
      );

      // TODO: check logs - not always equal?
      if (guessToCommonAncestorYears !== targetToCommonAncestorYears) {
        console.log(`Non-equal number of years since most recent common ancestor. Guess: ${guessNode._id} (${guessToCommonAncestorYears} years), Target: ${targetNode._id} (${targetToCommonAncestorYears} years), Ancestor: ${result.ancestor}`);
      }
    }
  }

  // TODO: Error if not found
  return result;
}