const { createInternalError, createValidationError } = require("../middleware/error");
const Event = require("../models/event");

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

    return res.sendStatus(204);
  } catch (err) {
    next(createInternalError(err.message));
  }
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
    const event = await Event.findById(id);

    if (!event) {
      return next(createValidationError("Event does not exist!", 404));
    }

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
