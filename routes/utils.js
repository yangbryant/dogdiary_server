
const responseClient = (res, httpCode = 500, code = 500, message = '服务器请求出错!', data = {}) => {
  let responseData = {};
  responseData.code = code;
  responseData.message = message;
  responseData.data = data;
  res.status(httpCode).json(responseData);
};

module.exports = { responseClient };