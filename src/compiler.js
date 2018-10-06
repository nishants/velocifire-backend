const Velocity = require('velocityjs');

module.exports = {
  compile: (template, data) => Velocity.render(template, data)
};
