const Member = require("../models/member");

const createMember = async (req, res, next) => {
  try {
    const member = await Member.create(req.body);

    return res.status(201).json({ success: true, member });
  } catch (err) {
    return next(err);
  }
};

const deleteMember = async (req, res, next) => {
  try {
    const { id } = req.params;
    const member = await Member.findByIdAndDelete(id);

    if (!member) {
      return res.status(404).json({ success: false, message: "Member does not exist!" });
    }

    return res.json({ success: true });
  } catch (err) {
    return next(err);
  }
};

const getMembers = async (req, res, next) => {
  try {
    const members = await Member.find();

    return res.json({ success: true, members });
  } catch (err) {
    return next(err);
  }
};

const getMemberById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const member = await Member.findById(id);

    if (!member) {
      return res.status(404).json({ success: false, message: "Member does not exist!" });
    }

    return res.json({ success: true, member });
  } catch (err) {
    return next(err);
  }
};

const searchMember = async (req, res, next) => {
  try {
    const { name = "", status } = req.query;
    const query = Member.find({ name: { $regex: name, $options: "i" } });

    if (status) query.where("status").equals(status);

    const members = await query.exec();

    return res.json({ success: true, members });
  } catch (err) {
    return next(err);
  }
};

const updateMember = async (req, res, next) => {
  try {
    const { id } = req.params;
    const member = await Member.findByIdAndUpdate(id, req.body, { returnDocument: "after" });

    if (!member) {
      return res.status(404).json({ success: false, message: "Member does not exist!" });
    }

    return res.json({ success: true, member });
  } catch (err) {
    return next(err);
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
