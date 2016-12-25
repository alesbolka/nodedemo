const Joi = require('joi');
const privateKey = require('./key');
const db = require(global.getPath('mock-db'));
const JWT = require('jsonwebtoken');
const tokenValidity = 30 * 60 * 1000; // 30 minutes

module.exports = {
  path: '/api/auth',
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
  handler: (request, reply) => {
    if (request.auth.isAuthenticated) {
      return reply({text: 'Already authenticated'}).code(403);
    }

    db.attemptAuth(request.payload.username, request.payload.password, (user) => {
      if (!user) {
        return reply({
          error: 'Invalid credentials',
          message: 'Username and password do not match'
        }).code(422);
      }

      let payload = {
        username: user.username,
        exp: (new Date()).getTime() + tokenValidity
      };
      let token = JWT.sign(
        payload,
        privateKey
      );

      reply({
        token: token,
        expiry: payload.exp
      });
    });
  }
};