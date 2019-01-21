var express = require('express');
var Foods = require('../controllers/foods');
var router = express.Router();

router.get('/', Foods.rootFood);
router.get('/findFoodByCategory', Foods.findFoodByCategory);
router.get('/findFoodByName', Foods.findFoodByName);
router.get('/addFood', Foods.addFood);
router.get('/deleteFood', Foods.deleteFood);

module.exports = router;