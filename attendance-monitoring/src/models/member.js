const { Schema, model } = require("mongoose");
const { v4: uuid } = require("uuid");

const MemberSchema = new Schema(
  {
    _id: { type: String, default: uuid },
    name: { type: String, required: true },
    status: { type: String, required: true },
    joinedDate: Date
  },
  {
    timestamps: true
  }
);

const Member = model("Member", MemberSchema);

module.exports = Member;
