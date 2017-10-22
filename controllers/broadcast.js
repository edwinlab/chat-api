const ioclient = require('socket.io-client');

const socket = ioclient('https://oy-chat-api.herokuapp.com');

exports.blast = async (ctx, next) => {
  const { message } = ctx.request.body;
  socket.emit('userLogin', 'admin');
  socket.emit('sendMessage', message);
  ctx.body = 'ok';
  await next();
};
