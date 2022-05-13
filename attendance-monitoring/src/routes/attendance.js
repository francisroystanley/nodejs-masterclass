const { Router } = require("express");

const { attendanceCtrl } = require("../controllers");
const { validatorMiddleware } = require("../middleware");
const { createAndUpdateRules, deleteRules } = require("../validations/attendance");

const router = Router();

router.route("/").post(validatorMiddleware(createAndUpdateRules), attendanceCtrl.createAttendance);

router
  .route("/:id")
  .put(validatorMiddleware(createAndUpdateRules), attendanceCtrl.updateAttendance)
  .delete(validatorMiddleware(deleteRules), attendanceCtrl.deleteAttendance);

module.exports = router;
