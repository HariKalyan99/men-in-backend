const Joi = require("joi");

const schema = Joi.object()
  .keys({
    gender: Joi.string().valid("male", "female"),
    age: Joi.number().integer().min(0).max(100),
  })
  .or("gender", "age");

const getQueryErrors = (data) => {
  const { gender, age } = data;
  const result = schema.validate({
    gender,
    age,
  });

  if (result.error) {
    return result.error;
  }
};

module.exports = getQueryErrors;
