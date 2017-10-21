const validator = require('validator');
const { ERRORS } = require('../constants');

const responseValidator = function responseValidator(req, fields) {
  const errors = [];
  const props = Object.keys(req);

  for (let i = 0; i < fields.length; i += 1) {
    const isPresent = props.indexOf(fields[i].name) !== -1;
    const isRequired = fields[i].required;

    if (!isPresent && isRequired) {
      switch (fields[i].name) {
        case 'username': errors.push({ error: ERRORS.INVALID_USERNAME }); break;
        case 'password': errors.push({ error: ERRORS.INVALID_PASSWORD }); break;
        default: errors.push({ error: ERRORS.INVALID_ENTRY }); break;
      }
    } else {
      if (fields[i].name === 'username') {
        if (!validator.isAlpha(req.username)) {
          errors.push({ error: ERRORS.INVALID_USERNAME });
        }
      }
      if (fields[i].name === 'password') {
        if (req.password && req.password.length < 8) {
          errors.push({ error: ERRORS.PASSWORD_TOO_SHORT });
        }
      }
    }
  }

  if (errors && errors.length) {
    return errors;
  }
  return req;
};

module.exports = {
  responseValidator,
};

