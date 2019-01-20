var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var bluebird = require('bluebird');
var config = require('config-lite')(__dirname);

var mongoose = require('mongoose');
global.mongoose = mongoose;
global.mongoose.Promise = bluebird;

var { responseClient } = require('./routes/utils');
global.response = responseClient;

var index = require('./routes/index');
var users = require('./routes/users');
var foods = require('./routes/foods');

var app = express();

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);
app.use('/foods', foods);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  const code = err.status || 500;
  const message = req.app.get('env') === 'development' ? err.message : '';
  const error = req.app.get('env') === 'development' ? { 'code' : err.status, 'message' : err.message } : {};

  global.response(res, code, code, message, error);
});

// start server
global.mongoose.connect(config.url, (err) => {
  if (err) {
    console.error(err);
    return;
  }
  console.info('connect database server success!');

  app.listen(config.port, (err) => {
    if (err) {
      console.error(err);
      return;
    }
    console.info('dog diary server listening on port', config.port, '!');
  });
}); 



module.exports = app;
