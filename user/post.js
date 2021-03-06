const db = require(global.getPath('mock-db'));
const Joi = require('joi');

function handler(request, reply) {
  if (request.auth.isAuthenticated) {
    return reply({error: 'Already authenticated'}).code(403);
  }

  db.addUser(
    request.payload.username,
    request.payload.password,
    request.payload.email,
    request.payload.birthdate,
    (user, err) => {
      if (err) {
        return reply({
          error: 'Invalid data',
          message: err.message,
          code: err.code
        }).code(406);
      }

      reply({message: "user created"});
    }
  );
}

module.exports = {
  path: '/api/user',
  method: 'POST',
  config: {
    auth: false,
    validate: {
      payload: {
        username: Joi.string().required(),
        password: Joi.string().required().min(6),
        birthdate: Joi.date().required(),
        password_repeat: Joi.required().valid(Joi.ref('password')).options({
          language: {
            any: {
              allowOnly: 'must match password'
            }
          }
        }),
        email: Joi.string().required().email()
      }
    }
  },
  handler: handler
};