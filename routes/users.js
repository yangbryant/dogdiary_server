var express = require('express');
var Users = require('../controllers/users');
var router = express.Router();

/* 查询用户列表 */
router.get('/', Users.usersList);
/* 查询用户详细信息 */
router.get('/:user_id', Users.findUser);
/* 新建用户信息 */
router.post('/', Users.addUser);
/* 更新用户信息 */
router.post('/:user_id', Users.updateUser);
/* 删除用户信息 */
router.delete('/:user_id', Users.deleteUser);

module.exports = router;
