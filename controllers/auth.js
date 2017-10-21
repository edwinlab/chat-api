const crypto = require('crypto');
const userUtils = require('../utils/user-utils');
const validationUtils = require('../utils/validation-utils');
const { ERRORS } = require('../constants');

const User = require('../models/user');

const { standardizeUser } = userUtils;
const { responseValidator } = validationUtils;

const responseData = user => ({
  user: standardizeUser(user),
});

exports.login = async (ctx, next) => {
  const validation = responseValidator(ctx.request.body, [
    { name: 'username', required: true },
    { name: 'password', required: true },
  ]);

  if (validation && validation.length && validation[0].error) {
    ctx.status = 422;
    ctx.body = { errors: validation };
    await next();
  }

  const { username, password } = validation;

  if (username && password) {
    const formattedEmail = username.toLowerCase();
    try {
      const user = await User.findOne({ username: formattedEmail });

      if (user === null) {
        ctx.status = 422;
        ctx.body = { errors: [{ error: ERRORS.USER_NOT_FOUND }] };
        await next();
      }

      const isSignIn = await user.comparePassword(password);
      if (isSignIn) {
        ctx.body = Object.assign(ctx.body || {}, responseData(user));
        await next();
      }
    } catch (err) {
      ctx.throw(500, err);
    }
  }
};

exports.register = async (ctx, next) => {
  const validation = responseValidator(ctx.request.body, [
    { name: 'username', required: true },
    { name: 'password', required: true },
  ]);

  if (validation && validation.length && validation[0].error) {
    ctx.status = 422;
    ctx.body = { errors: validation };
    await next();
  }

  const { username, password } = validation;

  if (username && password) {
    try {
      let user = await User.findOne({ username });

      if (user !== null) {
        ctx.status = 422;
        ctx.body = { errors: [{ error: ERRORS.USER_NOT_FOUND }] };
        await next();
      } else {
        const token = await crypto.randomBytes(64).toString('hex');

        user = new User({
          password,
          username,
          token,
        });

        const savedUser = await user.save();
        ctx.body = Object.assign(ctx.body || {}, responseData(savedUser));
        await next();
      }
    } catch (err) {
      ctx.throw(500, err);
    }
  }
};
