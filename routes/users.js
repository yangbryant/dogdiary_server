var express = require('express');
var router = express.Router();

const User = require('../models/user')

/* GET users listing. */
router.get('/', function(req, res) {
  User.find(null, 'name').then(data => {
    global.response(res, 200, 0, 'Success!', {list: data});
  }).cancel( err => {
    global.response(res);
  })
});

router.get('/findUser', function(req, res) {
  const name = req.query.name || null;
  if (!name) {
    global.response(res, 400);
    return;
  }
  User.find({name: {$regex: name}}, 'name').then(data => {
    global.response(res, 200, 0, 'Success!', {result: data});
  }).cancel( err => {
    global.response(res);
  })
});

router.get('/addUser', function(req, res) {
  const name = req.query.name || null;
  if (!name) {
    global.response(res, 400);
    return;
  }

  new User({ name }).save().then( data => {
    const jsonData = { User: name };
    global.response(res, 200, 0, 'Success!', jsonData);
  }).cancel( err => {
    global.response(res);
  })
});

router.get('/deleteUser', function(req, res) {
  const _id = req.query.id || null;
  if (!_id) {
    global.response(res, 400);
    return;
  }

  User.remove({ _id }).then( result => {
    if (result.n == 1) {
      global.response(res, 200, 0, '删除成功!');
    } else {
      global.response(res, 200, 1, '此用户不存在!');
    }
  }).cancel( err => {
    global.response(res);
  })
});

module.exports = router;
