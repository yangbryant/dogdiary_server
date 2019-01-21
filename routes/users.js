var express = require('express');
var Users = require('../controllers/users');
var router = express.Router();

router.get('/', Users.rootUser);
router.get('/findUser', Users.findUser);
router.get('/addUser', Users.addUser);
router.get('/deleteUser', Users.deleteUser);

module.exports = router;
