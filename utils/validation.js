const Joi = require('joi');

const validateSchema = (schema, data) => {
  const { error } = schema.validate(data, { abortEarly: false });
  if (error) {
    return error.details.map((detail) => detail.message);
  }
  return null;
};

module.exports = { validateSchema };