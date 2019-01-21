const UserModel = require('../models/user');

class Users {

  rootUser = (req, res, next) => {
    UserModel.find(null, 'name').then(data => {
      global.response(res, 200, 200, 'Success!', {
        list: data
      });
    }).cancel(err => {
      global.response(res);
    })
  }

  findUser = (req, res, next) => {
    const name = req.query.name || null;
    if (!name) {
      global.response(res, 400);
      return;
    }
    UserModel.find({
      name: {
        $regex: name
      }
    }, 'name').then(data => {
      global.response(res, 200, 200, 'Success!', {
        result: data
      });
    }).cancel(err => {
      global.response(res);
    })
  }

  addUser = (req, res, next) => {
    const name = req.query.name || null;
    if (!name) {
      global.response(res, 400);
      return;
    }

    new UserModel({
      name
    }).save().then(data => {
      const jsonData = {
        User: name
      };
      global.response(res, 200, 200, 'Success!', jsonData);
    }).cancel(err => {
      global.response(res);
    })
  }

  deleteUser = (req, res, next) => {
    const _id = req.query.id || null;
    if (!_id) {
      global.response(res, 400);
      return;
    }

    UserModel.remove({
      _id
    }).then(result => {
      if (result.n == 1) {
        global.response(res, 200, 200, '删除成功!');
      } else {
        global.response(res, 200, 204, '此用户不存在!');
      }
    }).cancel(err => {
      global.response(res);
    })
  }
}

module.exports = new Users();