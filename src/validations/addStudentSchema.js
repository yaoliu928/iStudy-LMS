const Joi = require('joi');
module.exports = Joi.object({
  firstName: Joi.string().min(1).max(255).required(),
  lastName: Joi.string().min(1).max(255).required(),
  email: Joi.string().email().message('Invalid email format').required(),
});