const { createInternalError, createValidationError } = require("../middleware/error");
const { Attendance, Event, Member } = require("../models");

const createMember = async (req, res, next) => {
  try {
    const member = await Member.create(req.body);

    return res.status(201).json({ member });
  } catch (err) {
    next(createInternalError(err.message));
  }
};

const deleteMember = async (req, res, next) => {
  try {
    const { id } = req.params;
    const member = await Member.findByIdAndDelete(id);

    if (!member) {
      return next(createValidationError("Member does not exist!", 404));
    }

    return res.sendStatus(204);
  } catch (err) {
    next(createInternalError(err.message));
  }
};

const getMemberAttendance = async memberId => {
  const attendance = await Attendance.find({ memberId });
  const eventIds = attendance.map(att => att.eventId);
  const events = await Event.find({ _id: { $in: eventIds } }).exec();

  return attendance.map(atd => {
    const event = events.find(evt => evt._id === atd.eventId);

    return { eventName: event.eventName, timeIn: atd.timeIn, timeOut: atd.timeOut };
  });
};

const getMembers = async (req, res, next) => {
  try {
    const members = await Member.find();

    return res.json({ members });
  } catch (err) {
    next(createInternalError(err.message));
  }
};

const getMemberById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const _member = await Member.findById(id);

    if (!_member) {
      return next(createValidationError("Member does not exist!", 404));
    }

    const member = _member.toJSON();
    member.eventAttendance = await getMemberAttendance(member._id);

    return res.json({ member });
  } catch (err) {
    next(createInternalError(err.message));
  }
};

const searchMember = async (req, res, next) => {
  try {
    const { name = "", status } = req.query;
    const query = Member.find({ name: { $regex: name, $options: "i" } });

    if (status) query.where("status").equals(status);

    const members = await query.exec();

    return res.json({ members });
  } catch (err) {
    next(createInternalError(err.message));
  }
};

const updateMember = async (req, res, next) => {
  try {
    const { id } = req.params;
    const member = await Member.findByIdAndUpdate(id, req.body);

    if (!member) {
      return next(createValidationError("Member does not exist!", 404));
    }

    return res.json({ member });
  } catch (err) {
    next(createInternalError(err.message));
  }
};

module.exports = {
  createMember,
  deleteMember,
  getMembers,
  getMemberById,
  searchMember,
  updateMember
};
