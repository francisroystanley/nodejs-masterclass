const { Schema, model } = require("mongoose");
const { v4: uuid } = require("uuid");

const AttendanceSchema = new Schema(
  {
    _id: { type: String, default: uuid },
    timeIn: { type: Date, required: true },
    timeOut: Date,
    eventId: { type: String, required: true },
    memberId: { type: String, required: true }
  },
  {
    timestamps: true
  }
);

const Attendance = model("Attendance", AttendanceSchema);

module.exports = Attendance;
