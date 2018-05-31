var express = require('express');
var router = express.Router();

const Food = require('../models/food');

/* GET Foods Api. */

/* 获取食物列表api */
router.get('/', function(req, res) {
  // Food.find(null, '_id name category eat detail').then(data => {
  //   global.response(res, 200, 0, 'Success!', {list: data});
  // }).cancel( err => {
  //   global.response(res);
  // })
  foodfind(null, res);
});

/* 根据食物类别获取食物列表api */
router.get('/findFoodByCategory', function(req, res) {
  const category = req.query.category || null;
  if (!category) {
    global.response(res, 400);
    return;
  }
  // Food.find({category: category}, '_id name category eat detail').then(data => {
  //   global.response(res, 200, 0, 'Success!', {list: data});
  // }).cancel( err => {
  //   global.response(res);
  // })
  foodfind({category: category}, res);
});

/* 根据名称查找食物api */
router.get('/findFoodByName', function(req, res) {
  const name = req.query.name || null;
  if (!name) {
    global.response(res, 400);
    return;
  }
  // Food.find({name: {$regex: name}}, '_id name category eat detail').then(data => {
  //   global.response(res, 200, 0, 'Success!', {list: data});
  // }).cancel( err => {
  //   global.response(res);
  // })
  foodfind({name: {$regex: name}}, res);
});

/* 查询数据库响应请求的接口方法 */
const foodfind = function(key, res) {
  Food.find(key, '_id name alias category eat logo title detail').then(data => {
    global.response(res, 200, 200, 'Success!', {list: data});
  }).cancel( err => {
    global.response(res);
  })
}

/* 添加食物信息api */
router.get('/addFood', function(req, res) {

  const name = req.query.name || null;
  const category = req.query.category || null;
  const eat = req.query.eat || null;
  const title = req.query.title || null;

  const alias = req.query.alias || null;
  const detail = req.query.detail || title;

  if (!name || !category || !eat || !title) {
    global.response(res, 400);
    return;
  }

  const updated = Date.parse(new Date())/1000;

  new Food({ name, alias, name_pinyin: name, category, eat, title, detail, updated, logo: null }).save().then( data => {
    const jsonData = { Food: name };
    global.response(res, 200, 200, 'Success!', jsonData);
  }).cancel( err => {
    global.response(res);
  })
});

/* 根据id删除食物api */
router.get('/deleteFood', function(req, res) {
  const _id = req.query.id || null;
  if (!_id) {
    global.response(res, 400);
    return;
  }

  Food.remove({ _id }).then( result => {
    if (result.n == 1) {
      global.response(res, 200, 200, '删除成功!');
    } else {
      global.response(res, 200, 204, '此用户不存在!');
    }
  }).cancel( err => {
    global.response(res);
  })
});

module.exports = router;