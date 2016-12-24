const privateKey = require(global.getPath('auth')).privateKey;
const db = require(global.getPath('mock-db'));

const validate = (decoded, request, callback) => {
  db.findByUsername(decoded.username, (user, err) => {
    callback(null, !!user);
  });
};

module.exports = (server) => {
  server.register(require('hapi-auth-jwt2'), (err) => {
    if (err) {
      throw err;
    }
    server.auth.strategy(
      'jwt',
      'jwt',
      {
        key: privateKey,
        validateFunc: validate,
        verifyOptions: {
          algorithms: [ 'HS256' ]
        }
      }
    );

    server.auth.default('jwt');
    require('./routeLoader')(server);
  });
};