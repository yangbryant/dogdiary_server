
const responseClient = (res, httpCode = 500, code = 3, message = '', data = {}) => {
  let responseData = {};
  responseData.code = code;
  responseData.message = message;
  responseData.data = data;
  res.status(httpCode).json(responseData);
};

module.exports = { responseClient };