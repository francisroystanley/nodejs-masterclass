const Attendance = require("../models/attendance");

const createAttendance = async (req, res, next) => {
  try {
    const attendance = await Attendance.create(req.body);

    return res.status(201).json({ success: true, attendance });
  } catch (err) {
    return next(err);
  }
};

const deleteAttendance = async (req, res, next) => {
  try {
    const { id } = req.params;
    const attendance = await Attendance.findByIdAndDelete(id);

    if (!attendance) {
      return res.status(404).json({ success: false, message: "Attendance does not exist!" });
    }

    return res.json({ success: true });
  } catch (err) {
    return next(err);
  }
};

const getAttendances = async (req, res, next) => {
  try {
    const attendances = await Attendance.find();

    return res.json({ success: true, attendances });
  } catch (err) {
    return next(err);
  }
};

const getAttendanceById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const attendance = await Attendance.findById(id);

    if (!attendance) {
      return res.status(404).json({ success: false, message: "Attendance does not exist!" });
    }

    return res.json({ success: true, attendance });
  } catch (err) {
    return next(err);
  }
};

const updateAttendance = async (req, res, next) => {
  try {
    const { id } = req.params;
    const attendance = await Attendance.findByIdAndUpdate(id, req.body, { returnDocument: "after" });

    if (!attendance) {
      return res.status(404).json({ success: false, message: "Attendance does not exist!" });
    }

    return res.json({ success: true, attendance });
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  createAttendance,
  deleteAttendance,
  getAttendances,
  getAttendanceById,
  updateAttendance
};
