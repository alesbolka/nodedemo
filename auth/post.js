const Joi = require('joi');
const privateKey = require('./key');
const db = require(global.getPath('mock-db'));
const JWT = require('jsonwebtoken');
const tokenValidity = 30 * 60 * 1000; // 30 minutes

module.exports = {
  path: '/auth',
  method: 'POST',
  config: {
    auth: false,
    validate: {
      payload: {
        username: Joi.string().required(),
        password: Joi.string().required()
      }
    }
  },
  handler: (req, res) => {
    if (req.auth.isAuthenticated) {
      return res({text: 'Already authenticated'}).code(403);
    }

    db.attemptAuth(req.payload.username, req.payload.password, (user) => {
      if (!user) {
        return res({
          error: 'Invalid credentials',
          message: 'Username and password do not match'
        }).code(422);
      }

      let token = JWT.sign(
        {
          username: user.username,
          exp: (new Date()).getTime() + tokenValidity
        },
        privateKey
      );

      res({
        redirectUrl: '/'
      }).header('Authorization', token);
    });
  }
};