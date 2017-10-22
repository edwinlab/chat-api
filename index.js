const Koa = require('koa');
const logger = require('koa-logger');
const mongoose = require('mongoose');
const bodyParser = require('koa-bodyparser');
const cors = require('kcors');
const IO = require('socket.io');
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

const io = IO(server);

const onlineUsers = {};

io.on('connection', (socket) => {
  console.log('Client connected');

  socket.on('userLogin', (username) => {
    console.log('%s has joined the chat!', username);
    onlineUsers[socket.id] = username;

    io.emit('userJoin', {
      socketId: socket.id,
      username,
      timestamp: new Date(),
      type: 'alert',
      message: `${username} has joined the chat!`,
    });
  });

  socket.on('sendMessage', (message) => {
    const senderUsername = onlineUsers[socket.id];

    const messageObject = {
      socketId: socket.id,
      username: senderUsername,
      timestamp: new Date(),
      type: 'message',
      message,
    };

    console.log('%s: %s', senderUsername, message);

    io.emit('newMessage', messageObject);
  });

  socket.on('disconnect', () => console.log('Client disconnected'));
});

module.exports = server;
