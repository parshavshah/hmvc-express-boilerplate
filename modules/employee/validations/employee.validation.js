var Joi = require("@hapi/joi");

exports.createEmployee = Joi.object({
  field1: Joi.string().required(),
});

exports.updateEmployee = Joi.object({
  field1: Joi.string().required(),
});
