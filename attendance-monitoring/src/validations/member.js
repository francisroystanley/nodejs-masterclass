const { body, query } = require("express-validator");

const createAndUpdateRules = [
  body("name").notEmpty().withMessage("Required"),
  body("status")
    .notEmpty()
    .withMessage("Required")
    .custom(val => ["Active", "Inactive"].includes(val)),
  body("joinedDate").optional().isISO8601().withMessage("Should be a valid datetime")
];

const searchRules = [
  query("name").optional(),
  query("status")
    .optional()
    .custom(val => ["Active", "Inactive"].includes(val)),
  query("searchQuery")
    .custom((val, { req }) => req.query.name || req.query.status)
    .withMessage("No search criteria provided")
];

module.exports = {
  createAndUpdateRules,
  searchRules
};
