var express = require('express');
var Users = require('../controllers/users');
var router = express.Router();

/* 查询用户列表 */
router.get('/', Users.usersList);
/* 查询用户详细信息 */
router.get('/profile/:user_id', Users.findUser);
/* 更新用户信息 */
router.post('/profile/:user_id', Users.updateUser);

/* 注册用户 */
router.post('/', Users.addUser);
/* 注销用户 */
router.delete('/:user_id', Users.deleteUser);
/* 用户登录 */
router.post('/login', Users.userLogin);
/* 用户退出登录 */
router.post('/signout', Users.userSignOut);

module.exports = router;
