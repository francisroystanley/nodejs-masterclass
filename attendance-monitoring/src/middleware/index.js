const errorMiddleware = require("./error");
const loggerMiddleware = require("./logger");
const validatorMiddleware = require("./validator");

module.exports = {
  errorMiddleware,
  loggerMiddleware,
  validatorMiddleware
};
