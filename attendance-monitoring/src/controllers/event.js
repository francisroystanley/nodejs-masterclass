const Event = require("../models/event");

const createEvent = async (req, res, next) => {
  try {
    const event = await Event.create(req.body);

    return res.status(201).json({ success: true, event });
  } catch (err) {
    return next(err);
  }
};

const deleteEvent = async (req, res, next) => {
  try {
    const { id } = req.params;
    const event = await Event.findByIdAndDelete(id);

    if (!event) {
      return res.status(404).json({ success: false, message: "Event does not exist!" });
    }

    return res.json({ success: true });
  } catch (err) {
    return next(err);
  }
};

const exportEvent = async (req, res, next) => {
  try {
    const { eventId } = req.query;
    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).json({ success: false, message: "Event does not exist!" });
    }

    return res.json({ success: true });
  } catch (err) {
    return next(err);
  }
};

const getEvents = async (req, res, next) => {
  try {
    const events = await Event.find();

    return res.json({ success: true, events });
  } catch (err) {
    return next(err);
  }
};

const getEventById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const event = await Event.findById(id);

    if (!event) {
      return res.status(404).json({ success: false, message: "Event does not exist!" });
    }

    return res.json({ success: true, event });
  } catch (err) {
    return next(err);
  }
};

const searchEvent = async (req, res, next) => {
  try {
    const { eventName = "", dateStart, dateEnd } = req.query;
    const query = Event.find({ eventName: { $regex: eventName, $options: "i" } });

    if (dateStart) query.where("eventStart").gte(dateStart);

    if (dateEnd) query.where("eventEnd").lte(dateEnd);

    const events = await query.exec();

    return res.json({ success: true, events });
  } catch (err) {
    return next(err);
  }
};

const updateEvent = async (req, res, next) => {
  try {
    const { id } = req.params;
    const event = await Event.findByIdAndUpdate(id, req.body, { returnDocument: "after" });

    if (!event) {
      return res.status(404).json({ success: false, message: "Event does not exist!" });
    }

    return res.json({ success: true, event });
  } catch (err) {
    return next(err);
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
