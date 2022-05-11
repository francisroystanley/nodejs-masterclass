const { Schema, model } = require("mongoose");

const EventSchema = new Schema(
  {
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
