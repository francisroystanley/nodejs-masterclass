const { Router } = require("express");

const { eventCtrl } = require("../controllers");
const { validate } = require("../middleware");
const { createAndUpdateRules, searchRules, exportRules } = require("../validations/event");

const router = Router();

router.route("/").get(eventCtrl.getEvents).post(validate(createAndUpdateRules), eventCtrl.createEvent);

router.route("/search").get(validate(searchRules), eventCtrl.searchEvent);

router.route("/export").get(validate(exportRules), eventCtrl.exportEvent);

router.route("/:id").get(eventCtrl.getEventById).put(validate(createAndUpdateRules), eventCtrl.updateEvent).delete(eventCtrl.deleteEvent);

module.exports = router;
