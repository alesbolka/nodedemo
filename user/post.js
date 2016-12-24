const db = require(global.getPath('mock-db'));
const Joi = require('joi');

function createProfile(request, reply) {

}

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
          message: err.message
        }).code(403);
      }

      reply('TODO');
    }
  );
  // db.findByUsername(request.auth.credentials.username, (user, err) => {
  //   if (err || !user) {
  //     // What to reply to the user in the case we get an error?
  //     console.error('User with username "' + request.auth.credentials.username + '" not found');
  //     if (err) {
  //       console.error(err);
  //     }
  //     return reply('Invalid request').code(400);
  //   }

  //   reply({
  //     username: user.username,
  //     email: user.email,
  //     birthdate: user.birthdate
  //   });
  // });
}

module.exports = {
  path: '/user',
  method: 'POST',
  config: {
    auth: false,
    validate: {
      payload: {
        username: Joi.string().required(),
        password: Joi.string().required().min(6),
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