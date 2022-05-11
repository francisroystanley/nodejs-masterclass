const { validationResult } = require("express-validator");

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

  return res.status(422).json({ message: "Validation Error", errors: errors.array({ onlyFirstError: true }) });
};

module.exports = validate;
