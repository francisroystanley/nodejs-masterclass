const { createInternalError, createValidationError } = require("../middleware/error");
const Attendance = require("../models/attendance");
const Event = require("../models/event");
const Member = require("../models/member");

const createAttendance = async (req, res, next) => {
  try {
    const { eventId, memberId } = req.body;
    const attendance = await Attendance.create(req.body);
    const member = await Member.findById(memberId);
    const event = await Event.findById(eventId);
    const error = [];

    if (!member) error.push("Member does not exist");

    if (!event) error.push("Event does not exist");

    if (error.length) {
      return next(createValidationError(error, 404));
    }

    member.eventAttendance = { attendanceId: attendance._id, eventId };
    event.memberAttendance = { attendanceId: attendance._id, memberId };
    await Promise.all[(member.save(), event.save())];

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
