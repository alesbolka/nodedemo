'use strict';
const Path = require('path');
const Hapi = require('hapi');

/**
 * A very hacky way to obtain the absolute path to a given location, platform independant
 * Always starts from the location of this file, which is supposed to be the root of this file (root folder of the project)
 * @return {string}
 */
global.getPath = function () {
  return Path.join.apply(null, [__dirname].concat(Array.prototype.slice.call(arguments)));
};

const server = new Hapi.Server();
server.connection({
  host: 'localhost',
  port: '8000'
});

// Serve static frontend files
server.register(require('inert'), (err) => {
  if (err) {
    throw err;
  }

  server.route({
    method: 'GET',
    path: '/{param*}',
    handler: {
      directory: {
        path: Path.join(__dirname, 'frontend', 'dist')
      }
    }
  });
});

server.route({
  method: 'GET',
  path: '/test',
  handler: function (request, reply) {
    reply('hello');
  }
});

// Start the server
server.start((err) => {
  if (err) {
      throw err;
  }

  console.log('Server running at:', server.info.uri);
});