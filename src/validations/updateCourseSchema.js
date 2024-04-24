const Joi = require('joi');
module.exports = Joi.object({
  code: Joi.string()
    .regex(/^[a-zA-Z]+[0-9]+$/)
    .message('Invalid code format')
    .optional(),
  name: Joi.string().min(4).max(255).optional(),
  description: Joi.string().optional(),
});