var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send({ Welcome: '狗狗日记' });
});

module.exports = router;
