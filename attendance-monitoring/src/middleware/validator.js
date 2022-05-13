const { validationResult } = require("express-validator");

const { createValidationError } = require("./error");

const customValidationResult = validationResult.withDefaults({
  formatter: error => ({
    param: error.param,
    message: error.msg
  })
});

const validate = validations => async (req, res, next) => {
  await Promise.all(validations.map(validation => validation.run(req)));
  const errors = customValidationResult(req);

  if (errors.isEmpty()) return next();

  return next(createValidationError(errors.array({ onlyFirstError: true }), 422));
};

module.exports = validate;
