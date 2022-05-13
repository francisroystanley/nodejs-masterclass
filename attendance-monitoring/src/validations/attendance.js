const { body } = require("express-validator");
const { isAfter, isBefore } = require("validator");

const { Member, Event } = require("../models");

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
    .withMessage("Should be after timeIn"),
  body("eventId")
    .exists()
    .withMessage("Required")
    .isUUID()
    .withMessage("Should be a valid uuid")
    .custom(val => {
      return new Promise((resolve, reject) =>
        Event.findById(val).then(event => {
          if (event) resolve(true);

          reject("Event does not exist");
        })
      );
    }),
  body("memberId")
    .exists()
    .withMessage("Required")
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
];

module.exports = {
  createAndUpdateRules
};
