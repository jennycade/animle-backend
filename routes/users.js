var express = require('express');
var router = express.Router();

/* GET user - verify */
router.get('/:userId', async function(req, res, next) {

  res.send('respond with a resource');
});

router.post('/', async function(req, res, next) {
  res.status(201).json({userId: 'bloop'})
});

module.exports = router;
