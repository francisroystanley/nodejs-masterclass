const { body } = require("express-validator");
const { isAfter, isBefore } = require("validator");

const createAndUpdateRules = [
  body("timeIn")
    .exists()
    .withMessage("Required")
    .isISO8601()
    .withMessage("Should be a valid datetime")
    .custom((val, { req }) => isBefore(val, req.body.timeOut))
    .withMessage("Should be before timeOut"),
  body("timeOut")
    .optional()
    .isISO8601()
    .withMessage("Should be a valid datetime")
    .custom((val, { req }) => isAfter(val, req.body.timeIn))
    .withMessage("Should be after timeIn")
];

module.exports = {
  createAndUpdateRules
};
