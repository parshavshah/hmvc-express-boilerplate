var Joi = require("@hapi/joi");

exports.createBlueprint = Joi.object({
  field1: Joi.string().required(),
});

exports.updateBlueprint = Joi.object({
  field1: Joi.string().required(),
});
