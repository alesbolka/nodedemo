const privateKey = require(global.getPath('auth')).privateKey;
const db = require(global.getPath('mock-db'));
const obj_get = require(global.getPath('helpers', 'object_get'));

const validate = (decoded, request, callback) => {
  db.findByUsername(decoded.username, (user, err) => {
    if (!user) {
      return callback(null, false);
    }

    db.checkTokenBlacklist(request.auth.token, (state) => {
      if (state) {
        return callback(null, user);
      }
      return callback(null, false);
    });
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
        validateFunc: validate
      }
    );

    server.auth.default('jwt');
    require('./routeLoader')(server);
  });
};