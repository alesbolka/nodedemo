'use strict';
const bcrypt = require('bcrypt');

let blacklist = {};
let users = {
  'randomjohn': {
    username: 'randomjohn',
    password: '$2a$10$r.mm/7hcGSXbW6PtMV5ekefduCeZi6aUhWapjLqDkFhqzzqUjQ8IS', // test211
    email: 'random.john@test.com',
    birthdate: '1950-07-31'
  }
};

/**
 * Add a new user to the db
 *
 * @param {string}   username
 * @param {string}   password
 * @param {string}   email
 * @param {string}   birthdate
 * @param {Function} cb(user, err);
 */
function addUser(username, password, email, birthdate, cb) {
  if (users[username]) {
    return cb(null, new Error('Username already exists'));
  }

  bcrypt.hash(password, 10, (err, hash) => {
    if (err) {
      return cb(null, new Error('Password could not be saved'));
    }

    users[username] = {
      username:  username,
      password: hash,
      email: email,
      birthdate: birthdate
    };

    cb(users[username], false);
  });
}

/**
 * Add token to the blacklist
 *
 * @param  {string}   token
 * @param  {Function} cb
 */
function blacklistAdd(token, cb) {
  blacklist[token] = 1;
  cb();
}

/**
 * Check if token is blacklisted
 *
 * @param  {string}   token
 * @param  {Function} cb
 */
function checkTokenBlacklist(token, cb) {
  cb(blacklist[token] === undefined);
}

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

  cb(users[username], undefined);
}

/**
 * Attempt to authenticate a user
 *
 * @param  {string}   username
 * @param  {string}   password
 * @param  {Function} cb(Object||undefined)
 */
function attemptAuth (username, password, cb) {
  if (!username || !password) {
    return cb(undefined);
  }

  // I could avoid the extra callback here, but decided to simulate querying a DB
  findByUsername(username, function (user, err) {
    if (err || user === undefined) {
      return cb(undefined);
    }

    bcrypt.compare(password, user.password, function(err, res) {
      if (err) {
        return cb(undefined);
      }

      cb(user);
    });
  });
}

exports.addUser = addUser;
exports.attemptAuth = attemptAuth;
exports.blacklistAdd = blacklistAdd;
exports.checkTokenBlacklist = checkTokenBlacklist;
exports.findByUsername = findByUsername;
