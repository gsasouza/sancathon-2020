const config = require('@sancathon/babel');

module.exports = {
  ...config,
  ignore: [/node_modules\/(?!@sancathon)/],
};
