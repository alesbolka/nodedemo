const db = require(global.getPath('mock-db'));

module.exports = {
  path: '/api/auth/logout',
  method: 'GET',
  config: {
    auth: 'jwt'
  },
  handler: (req, res) => {
    db.blacklistAdd(req.auth.token, () => {
      res().code(204);
    });
  }
};