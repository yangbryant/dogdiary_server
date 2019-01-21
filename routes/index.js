var home = require('./home');
var users = require('./users');
var foods = require('./foods');

module.exports = (app) => {

  app.use('/', home);
  app.use('/users', users);
  app.use('/foods', foods);

}