const { body, query, param } = require("express-validator");

const { Attendance, Member } = require("../models");

const createAndUpdateRules = [
  body("name").notEmpty().withMessage("Required"),
  body("status")
    .notEmpty()
    .withMessage("Required")
    .custom(val => ["Active", "Inactive"].includes(val)),
  body("joinedDate").optional().isISO8601().withMessage("Should be a valid datetime")
];

const deleteRules = [
  param("id")
    .isUUID()
    .withMessage("Should be a valid uuid")
    .custom(val => {
      return new Promise((resolve, reject) =>
        Member.findById(val).then(member => {
          if (member) resolve(true);

          reject("Member does not exist");
        })
      );
    })
    .custom(val => {
      return new Promise((resolve, reject) =>
        Attendance.findOne({ memberId: val }).then(attendance => {
          if (!attendance) resolve(true);

          reject("Event Attendance exist");
        })
      );
    })
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
  deleteRules,
  searchRules
};
