const Joi = require('joi');
module.exports = Joi.object({
  firstName: Joi.string().min(1).max(255).optional(),
  lastName: Joi.string().min(1).max(255).optional(),
  email: Joi.string().email().message('Invalid email format').optional(),
});