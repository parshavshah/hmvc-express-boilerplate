var Joi = require("@hapi/joi");

exports.createRole = Joi.object({
  field1: Joi.string().required(),
});

exports.updateRole = Joi.object({
  field1: Joi.string().required(),
});
