const Hapi = require('hapi');

let server;

function bootUp() {
  if (server) {
    return console.error('Server already booted up');
  }

  server = new Hapi.Server()
  server.connection({
    host: 'localhost',
    port: '8000'
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
