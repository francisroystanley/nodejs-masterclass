const createInternalError = (error, status = 500) => ({
  status,
  result: "Internal Error",
  error
});

const createValidationError = (error, status = 500) => ({
  status,
  result: "Validation Error",
  error
});

module.exports = {
  createInternalError,
  createValidationError
};
