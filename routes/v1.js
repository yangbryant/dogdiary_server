var express = require('express');
var router = express.Router();

var users = require('./users');
var foods = require('./foods');

router.use('/users', users);
router.use('/foods', foods);

module.exports = router;