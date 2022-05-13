const { Schema, model } = require("mongoose");
const { v4: uuid } = require("uuid");

const EventSchema = new Schema(
  {
    _id: { type: String, default: uuid },
    eventName: { type: String, required: true },
    eventType: { type: String, required: true },
    eventStart: { type: Date, required: true },
    eventEnd: { type: Date, required: true }
  },
  {
    timestamps: true
  }
);

const Event = model("Event", EventSchema);

module.exports = Event;
