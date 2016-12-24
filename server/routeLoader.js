const authRoutes = require(global.getPath('auth')).routes;
var routes = [].concat(authRoutes);

module.exports = (server) => {
  server.route(routes);
};