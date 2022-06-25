var Joi = require("@hapi/joi");

exports.createUser = Joi.object({
  field1: Joi.string().required(),
});

exports.updateUser = Joi.object({
  field1: Joi.string().required(),
});
