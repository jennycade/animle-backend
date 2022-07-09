var express = require('express');
var router = express.Router();

const User = require('../models/user');
const userController = require('../controllers/userController');

/* GET user - verify */
router.get('/:userId',
  userController.validateObjectId,
  async function(req, res, next) {
    try {
      // found -> 200; invalid -> 404
      // check for valid userId
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

router.post('/', async function(req, res, next) {
  try {
    const user = await User.create({games: []});
    res.status(201).json({userId: user._id});
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
