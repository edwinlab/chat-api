const Koa = require('koa');
const logger = require('koa-logger');
const bodyParser = require('koa-bodyparser');
const routes = require('./routes');
const config = require('./config');

const app = new Koa()
  .use(logger())
  .use(bodyParser())
  .use(routes.routes())
  .use(routes.allowedMethods());

const server = app.listen(config.server.port);

module.exports = server;