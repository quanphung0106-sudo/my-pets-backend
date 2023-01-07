const ItemRouter = require('./items');
const OrderRouter = require('./orders');
const UserRouter = require('./users');
const AuthRouter = require('./auth');

function route(app) {
  app.use('/api/items', ItemRouter);
  app.use('/api/orders', OrderRouter);
  app.use('/api/users', UserRouter);
  app.use('/api/auth', AuthRouter);
}

module.exports = route;
