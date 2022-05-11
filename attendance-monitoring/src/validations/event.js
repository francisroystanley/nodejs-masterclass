const { body, query } = require("express-validator");
const { isAfter, isBefore } = require("validator");

const createAndUpdateRules = [
  body("eventName").notEmpty().withMessage("Required"),
  body("eventType").notEmpty().withMessage("Required"),
  body("eventStart")
    .exists()
    .withMessage("Required")
    .isISO8601()
    .withMessage("Should be a valid datetime")
    .isAfter()
    .withMessage("Should be after today")
    .custom((val, { req }) => isBefore(val, req.body.eventEnd))
    .withMessage("Should be before eventEnd"),
  body("eventEnd")
    .exists()
    .withMessage("Required")
    .isISO8601()
    .withMessage("Should be a valid datetime")
    .custom((val, { req }) => isAfter(val, req.body.eventStart))
    .withMessage("Should be after eventStart")
];

const exportRules = [query("eventId").notEmpty().withMessage("Required")];

const searchRules = [
  query("eventName").optional(),
  query("dateStart").optional().isISO8601().withMessage("Should be a valid datetime"),
  query("dateEnd").optional().isISO8601().withMessage("Should be a valid datetime"),
  query("searchQuery")
    .custom((val, { req }) => req.query.eventName || req.query.dateStart || req.query.dateEnd)
    .withMessage("No search criteria provided")
];

module.exports = {
  createAndUpdateRules,
  exportRules,
  searchRules
};
