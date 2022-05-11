const { Schema, model } = require("mongoose");

const AttendanceSchema = new Schema(
  {
    timeIn: { type: Date, required: true },
    timeOut: Date
  },
  {
    timestamps: true
  }
);

const Attendance = model("Attendance", AttendanceSchema);

module.exports = Attendance;
