const _ = require('lodash');

const standardizeUser = user => ({
  id: _.get(user, '_id') || '',
  username: _.get(user, 'username') || '',
  token: _.get(user, 'token') || '',
});

module.exports = {
  standardizeUser,
};
