module.exports = (server) => {
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
          path: global.getPath('frontend', 'dist')
        }
      }
    });
  });
};