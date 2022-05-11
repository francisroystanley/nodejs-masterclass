const { Router } = require("express");

const { attendanceCtrl } = require("../controllers");
const { validate } = require("../middleware");
const { createAndUpdateRules } = require("../validations/attendance");

const router = Router();

router.route("/").get(attendanceCtrl.getAttendances).post(validate(createAndUpdateRules), attendanceCtrl.createAttendance);

router
  .route("/:id")
  .get(attendanceCtrl.getAttendanceById)
  .put(validate(createAndUpdateRules), attendanceCtrl.updateAttendance)
  .delete(attendanceCtrl.deleteAttendance);

module.exports = router;
