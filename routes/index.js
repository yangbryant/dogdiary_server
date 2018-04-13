var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  const jsonData = { Welcome: '狗狗日记' };
  global.response(res, 200, 0, 'Success!', jsonData);
});

module.exports = router;
