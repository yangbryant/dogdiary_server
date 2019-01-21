var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('tracer').colorConsole();
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var bluebird = require('bluebird');
var config = require('config-lite')(__dirname);
var session = require('express-session');
var connectMongo = require('connect-mongo');

var mongoose = require('mongoose');
global.mongoose = mongoose;
global.mongoose.Promise = bluebird;

global.logger = logger;

var { responseClient } = require('./routes/utils');
global.response = responseClient;

var router = require('./routes/index');

var app = express();

app.use(cookieParser());
const mongoStore = connectMongo(session);
app.use(session({
  name: config.session.name,
  secret: config.session.secret,
  store: new mongoStore({ url: config.url }),
  cookie: config.session.cookie,
}));

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

router(app);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  const code = err.status || 500;
  const message = req.app.get('env') === 'development' ? err.message : '';
  const error = req.app.get('env') === 'development' ? { 'code': err.status, 'message': err.message } : {};

  global.response(res, code, code, message, error);
});

// start server
global.mongoose.connect(config.url, (err) => {
  if (err) {
    global.logger.error(err);
    return;
  }
  global.logger.info('connect database server success!');

  app.listen(config.port, (err) => {
    if (err) {
      global.logger.error(err);
      return;
    }
    global.logger.info('dog diary server listening on port', config.port, '!');
  });
});

module.exports = app;