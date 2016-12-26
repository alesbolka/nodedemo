const Hapi = require('hapi');

let server;

function bootUp(port) {
  port = port || 8000;
  if (server) {
    return console.error('Server already booted up');
  }

  server = new Hapi.Server()
  server.connection({
    host: 'localhost',
    port: port,
    routes: {
      state: {
        parse: false,
        failAction: 'ignore'
      },
      validate: {
        options: {
          abortEarly: false
        },
        failAction: (request, reply, source, error) => {
          // custom error message
          let msg = {
            error: 'Invalid data',
            keys: {}
          };
          for (var ii = error.data.details.length - 1; ii >= 0; ii--) {
            msg.keys[error.data.details[ii].path] = {
              type: error.data.details[ii].type,
              message: error.data.details[ii].message
            }
          }
          error.output.error_details = error.data.details;
          reply(msg).code(error.output.statusCode);
        }
      }
    }
  });

  require('./static')(server);
  require('./authEnable')(server);

  server.start((err) => {
    if (err) {
        throw err;
    }

    console.log('Server running at:', server.info.uri);
  });
}

exports.bootUp = bootUp;
