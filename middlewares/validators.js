const getQueryErrors = require("../validators/users.validators");

const validateSearchQuery = (request, response, next) => {
  const { gender, age } = request.query;

  const error = getQueryErrors({ gender, age });

  if (error) {
    return response.status(422).json(error);
  }

  next();
};

module.exports = validateSearchQuery;
