const routes = [
  {
    path: '/auth',
    method: 'GET',
    config: {
      auth: false
    },
    handler: (req, res) => {
      res({text: 'token not required'})
    }
  },
  {
    path: '/authtest',
    method: 'GET',
    config: {
      auth: 'jwt'
    },
    handler: (req, res) => {
      res({text: 'token used'})
    }
  }
];

module.exports = routes;