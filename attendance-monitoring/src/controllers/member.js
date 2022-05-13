const { createInternalError, createValidationError } = require("../middleware/error");
const Member = require("../models/member");

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
    const member = await Member.findById(id);

    if (!member) {
      return next(createValidationError("Member does not exist!", 404));
    }

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
