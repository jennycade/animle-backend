var express = require('express');
var router = express.Router();

// routes
// get gameboard state
// post guess
// log in
// get user stats
// get species list (for filterable list)

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/guess')

module.exports = router;
