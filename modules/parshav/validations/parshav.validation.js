var Joi = require("@hapi/joi");

exports.createParshav = Joi.object({
  field1: Joi.string().required(),
});

exports.updateParshav = Joi.object({
  field1: Joi.string().required(),
});
