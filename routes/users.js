var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  const jsonData = { Users: '用户' };
  global.response(res, 200, 0, 'Success!', jsonData);
});

module.exports = router;
