const { createInternalError, createValidationError } = require("../middleware/error");
const { Attendance } = require("../models");

const createAttendance = async (req, res, next) => {
  try {
    const attendance = await Attendance.create(req.body);

    return res.status(201).json({ attendance });
  } catch (err) {
    next(createInternalError(err.message));
  }
};

const deleteAttendance = async (req, res, next) => {
  try {
    const { id } = req.params;
    const attendance = await Attendance.findByIdAndDelete(id);

    if (!attendance) {
      return next(createValidationError("Attendance does not exist!", 404));
    }

    return res.sendStatus(204);
  } catch (err) {
    next(createInternalError(err.message));
  }
};

const updateAttendance = async (req, res, next) => {
  try {
    const { id } = req.params;
    const attendance = await Attendance.findByIdAndUpdate(id, req.body);

    if (!attendance) {
      return next(createValidationError("Attendance does not exist!", 404));
    }

    return res.json({ attendance });
  } catch (err) {
    next(createInternalError(err.message));
  }
};

module.exports = {
  createAttendance,
  deleteAttendance,
  updateAttendance
};
