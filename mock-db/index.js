'use strict';
const bcrypt = require('bcrypt');

let users = {
  'randomjohn': {
    username: 'randomjohn',
    password: '$2a$10$r.mm/7hcGSXbW6PtMV5ekefduCeZi6aUhWapjLqDkFhqzzqUjQ8IS', // test211
    email: 'random.john@test.com',
    birthdate: '1950-07-31'
  }
};

/**
 * Find a user by their username
 *
 * @param  {string}   username
 * @param  {Function} cb(Object, Error)
 */
function findByUsername (username, cb) {
  if (typeof cb !== 'function') {
    throw new Error('Callback is not a function');
  }

  if (typeof username !== 'string' || !username.length) {
    return cb(undefined, new Error('Invalid username'));
  }

  if (!users[username]) {
    return cb(undefined, new Error('User does not exist'));
  }

  cb(users[username], undefined);
}

/**
 * Attempt to authenticate a user
 *
 * @param  {string}   username
 * @param  {string}   password
 * @param  {Function} cb(boolean)
 */
function attemptAuth (username, password, cb) {
  if (!username || !password) {
    return cb(false);
  }

  // I could avoid the extra callback here, but decided to simulate querying a DB
  findByUsername(username, function (user, err) {
    if (err || user === undefined) {
      return cb(false);
    }

    bcrypt.compare(password, user.password, function(err, res) {
      if (err) {
        return cb(false);
      }

      cb(res);
    });
  });
}

exports.findByUsername = findByUsername;
exports.attemptAuth = attemptAuth;
