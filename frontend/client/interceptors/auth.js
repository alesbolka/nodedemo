// Routes without auth required
// TODO - find a better solution
const nonAuth = [
  '/api/auth'
];
export default (request, next) => {
  console.log(request.headers.Authorization);
  next();
}