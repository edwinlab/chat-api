const Koa = require('koa');
const logger = require('koa-logger');
const mongoose = require('mongoose');
const bodyParser = require('koa-bodyparser');
const cors = require('kcors');
const routes = require('./routes');
const config = require('./config');

// Make mongoose use native ES6 promises
mongoose.Promise = global.Promise;

// Connect to MongoDB
mongoose.connect(config.database.url, config.database.opts);

const app = new Koa()
  .use(cors())
  .use(logger())
  .use(bodyParser())
  .use(routes.routes())
  .use(routes.allowedMethods());

const server = app.listen(config.server.port);

module.exports = server;
