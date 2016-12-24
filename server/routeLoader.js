const authRoutes = require(global.getPath('auth')).routes;
const userRoutes = require(global.getPath('user')).routes;

var routes = [].concat(
  authRoutes,
  userRoutes
);

module.exports = (server) => {
  server.route(routes);
};