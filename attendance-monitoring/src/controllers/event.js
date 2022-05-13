const fs = require("fs");
const moment = require("moment");
const path = require("path");
const xlsx = require("xlsx");

const { createInternalError, createValidationError } = require("../middleware/error");
const { Attendance, Event, Member } = require("../models");

const exportPath = path.join(process.cwd(), "exports");

const createEvent = async (req, res, next) => {
  try {
    const event = await Event.create(req.body);

    return res.status(201).json({ event });
  } catch (err) {
    next(createInternalError(err.message));
  }
};

const deleteEvent = async (req, res, next) => {
  try {
    const { id } = req.params;
    const event = await Event.findByIdAndDelete(id);

    if (!event) {
      return next(createValidationErrorError("Event does not exist!", 404));
    }

    return res.sendStatus(204);
  } catch (err) {
    next(createInternalError(err.message));
  }
};

const exportEvent = async (req, res, next) => {
  try {
    const { eventId } = req.query;
    const event = await Event.findById(eventId);

    if (!event) {
      return next(createValidationError("Event does not exist!", 404));
    }

    eventAttendance = await getEventAttendance(eventId);
    const data = eventAttendance.map(item => ({
      "Name": item.name,
      "Time In": item.timeIn,
      "Time Out": item.timeOut || ""
    }));
    const datetime = moment(event.dateStart).format("YYYY-MM-DD");
    const fileName = `${event.eventName}_${datetime}.xlsx`;
    const workSheet = xlsx.utils.json_to_sheet(data);
    const workBook = xlsx.utils.book_new();
    const fullPath = path.join(exportPath, fileName);

    if (!fs.existsSync(exportPath)) fs.mkdirSync(exportPath);

    xlsx.utils.book_append_sheet(workBook, workSheet, event.eventName);
    xlsx.writeFileXLSX(workBook, fullPath);

    return res.download(fullPath, fileName);
  } catch (err) {
    next(createInternalError(err.message));
  }
};

const getEventAttendance = async eventId => {
  const attendance = await Attendance.find({ eventId }).sort("timeIn");
  const memberIds = attendance.map(att => att.memberId);
  const members = await Member.find({ _id: { $in: memberIds } }).exec();

  return attendance.map(att => {
    const member = members.find(mbr => mbr._id === att.memberId);

    return { name: member.name, timeIn: att.timeIn, timeOut: att.timeOut };
  });
};

const getEvents = async (req, res, next) => {
  try {
    const events = await Event.find();

    return res.json({ events });
  } catch (err) {
    next(createInternalError(err.message));
  }
};

const getEventById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const _event = await Event.findById(id);

    if (!_event) {
      return next(createValidationError("Event does not exist!", 404));
    }

    const event = _event.toJSON();
    event.eventAttendance = await getEventAttendance(event._id);

    return res.json({ event });
  } catch (err) {
    next(createInternalError(err.message));
  }
};

const searchEvent = async (req, res, next) => {
  try {
    const { eventName = "", dateStart, dateEnd } = req.query;
    const query = Event.find({ eventName: { $regex: eventName, $options: "i" } });

    if (dateStart) query.where("eventStart").gte(dateStart);

    if (dateEnd) query.where("eventEnd").lte(dateEnd);

    const events = await query.exec();

    return res.json({ events });
  } catch (err) {
    next(createInternalError(err.message));
  }
};

const updateEvent = async (req, res, next) => {
  try {
    const { id } = req.params;
    const event = await Event.findByIdAndUpdate(id, req.body);

    if (!event) {
      return next(createValidationError("Event does not exist!", 404));
    }

    return res.json({ event });
  } catch (err) {
    next(createInternalError(err.message));
  }
};

module.exports = {
  createEvent,
  deleteEvent,
  exportEvent,
  getEvents,
  getEventById,
  searchEvent,
  updateEvent
};
