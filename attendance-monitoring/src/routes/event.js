const { Router } = require("express");

const { eventCtrl } = require("../controllers");
const { validatorMiddleware } = require("../middleware");
const { createAndUpdateRules, searchRules, exportRules, deleteRules } = require("../validations/event");

const router = Router();

router.route("/").get(eventCtrl.getEvents).post(validatorMiddleware(createAndUpdateRules), eventCtrl.createEvent);

router.route("/search").get(validatorMiddleware(searchRules), eventCtrl.searchEvent);

router.route("/export").get(validatorMiddleware(exportRules), eventCtrl.exportEvent);

router
  .route("/:id")
  .get(eventCtrl.getEventById)
  .put(validatorMiddleware(createAndUpdateRules), eventCtrl.updateEvent)
  .delete(validatorMiddleware(deleteRules), eventCtrl.deleteEvent);

module.exports = router;
