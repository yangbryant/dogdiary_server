const UserModel = require('../models/user');

class Users {

  /* 查询用户列表 */
  usersList = async (req, res, next) => {
    let data;
    try {
      data = await UserModel.find({ active: true }, {
        user_id: 1,
        username: 1
      });
    } catch (errr) {
      return global.response(res, 400, 400, 'ERROR_DB_FAILED', '数据库操作失败');
    }
    return global.response(res, 200, 200, 'SUCCESS', '操作成功', {
      list: data
    });
  }

  /* 查询用户详细信息 */
  findUser = async (req, res, next) => {
    const user_id = req.params.user_id || null;
    if (!user_id || !Number(user_id)) {
      return global.response(res, 400, 400, 'ERROR_QUERY', 'USERID 参数错误');
    }

    let user;
    try {
      user = await UserModel.findOne({
        active: true,
        user_id
      }, {
        user_id: 1,
        username: 1
      });
    } catch (err) {
      return global.response(res, 400, 400, 'ERROR_DB_FAILED', '数据库操作失败');
    }

    if (user) {
      return global.response(res, 200, 200, 'SUCCESS', '操作成功!', { User: user });
    } else {
      return global.response(res, 200, 204, 'ERROR_USER_NOT_FOUND', '用户不存在!');
    }
  }

  /* 注册用户 */
  addUser = async (req, res, next) => {
    const username = req.body.username || null;
    const password = req.body.password || null;
    try {
      if (!username) {
        throw new Error('用户名参数错误');
      } else if (!password) {
        throw new Error('密码参数错误');
      }
    } catch (err) {
      return global.response(res, 400, 400, 'ERROR_QUERY', err.message);
    }

    let user;
    try {
      user = await UserModel.findOne({
        username
      });
    } catch (err) {
      return global.response(res, 400, 400, 'ERROR_DB_FAILED', '数据库操作失败');
    }

    if (user) {
      return global.response(res, 400, 400, 'ERROR_USER_EXISTS', '用户名已占用');
    }

    let userCount;
    try {
      userCount = await UserModel.find({}).count();
    } catch (err) {
      return global.response(res, 400, 400, 'ERROR_DB_FAILED', '数据库操作失败');
    }

    let data;
    try {
      data = await new UserModel({
        active: true,
        username,
        password,
        user_id: userCount + 1
      }).save();
    } catch (err) {
      return global.response(res, 400, 400, 'ERROR_DB_FAILED', '数据库操作失败');
    }

    const jsonData = {
      User: {
        _id: data._id,
        user_id: data.user_id,
        username: data.username
      }
    };
    return global.response(res, 200, 200, 'SUCCESS', '操作成功!', jsonData);
  }

  /* 更新用户信息 */
  updateUser = (req, res, next) => {
    return global.response(res, 200, 204, 'INFO_NOT_FUNCTION', '功能未完成');
  }

  /* 注销用户 */
  deleteUser = async (req, res, next) => {
    const user_id = req.params.user_id || null;
    if (!user_id || !Number(user_id)) {
      return global.response(res, 400, 400, 'ERROR_QUERY', 'USERID 参数错误');
    }

    let result;
    try {
      result = await UserModel.where({
        user_id
      }).update({ $set: { active: false }});
    } catch (err) {
      return global.response(res, 400, 400, 'ERROR_DB_FAILED', '数据库操作失败');
    }

    if (result.n == 1) {
      return global.response(res, 200, 200, 'SUCCESS', '操作成功!');
    } else {
      return global.response(res, 200, 204, 'ERROR_USER_NOT_FOUND', '用户不存在!');
    }
  }

  /* 用户登录 */
  userLogin = async (req, res, next) => {
    const { username, password } = req.body;
    try {
      if (!username) {
        throw new Error('用户名参数错误');
      } else if (!password) {
        throw new Error('密码参数错误');
      }      
    } catch (err) {
      return global.response(res, 400, 400, 'ERROR_QUERY', err.message);
    }

    let user;
    try {
      user = await UserModel.findOne({ username });
    } catch (err) {
      return global.response(res, 400, 400, 'ERROR_DB_FAILED', '数据库操作失败');
    }

    /* 检查用户可用性 */
    if (!user) {
      return global.response(res, 400, 204, 'ERROR_USER_NOT_FOUND', '用户不存在');
    }

    /* 校验密码 */
    if (user.password.toString() !== password.toString()) {
      return global.response(res, 400, 400, 'ERROR_PASSWORD', '密码错误');
    }

    req.session.user_id = user.user_id;
    return global.response(res, 200, 200, 'SUCCESS', '操作成功', { user_id: user.user_id });
  }

  /* 用户退出登录 */
  userSignOut = async (req, res, next) => {
    const user_id = req.body.user_id || null;
    if (!user_id || !Number(user_id)) {
      return global.response(res, 400, 400, 'ERROR_QUERY', 'USERID 参数错误');
    }
    if (req.session.user_id === Number(user_id)) {
      delete req.session.user_id;
      return global.response(res, 200, 200, 'SUCCESS', '操作成功', { user_id });
    } else {
      return global.response(res, 400, 400, 'ERROR_USER_NO_LOGIN', '用户未登录', { user_id });
    }
  }
}

module.exports = new Users();