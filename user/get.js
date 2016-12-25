const db = require(global.getPath('mock-db'));

function getMyProfile(request, reply) {
  db.findByUsername(request.auth.credentials.username, (user, err) => {
    if (err || !user) {
      // What to reply to the user in the case we get an error?
      console.error('User with username "' + request.auth.credentials.username + '" not found');
      if (err) {
        console.error(err);
      }
      return reply('Invalid request').code(400);
    }

    reply({
      username: user.username,
      email: user.email,
      birthdate: user.birthdate
    });
  });
}

module.exports = {
  path: '/api/user',
  method: 'GET',
  config: {
    auth: 'jwt'
  },
  handler: getMyProfile
};