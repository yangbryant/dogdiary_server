var home = require('./home');
var v1 = require('./v1');

module.exports = (app) => {

  app.use('/', home);
  app.use('/v1', v1);

}