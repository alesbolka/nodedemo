const db = require(global.getPath('mock-db'));
const Joi = require('joi');

function createProfile(request, reply) {
  reply('i got through');
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
  handler: createProfile
};