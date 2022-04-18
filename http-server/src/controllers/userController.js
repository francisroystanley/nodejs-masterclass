const db = require("../database");

const createUser = (req, res, next) => {
  if (req.body.id) delete req.body.id;

  const userId = db.users.create({ ...req.body });

  return res.status(201).json({ user: db.users.get(userId), success: true });
};

const deleteUser = (req, res, next) => {
  const user = getUser("userName", req.params.userName);
  db.users.delete(user.id);

  return res.json({ success: true });
};

const getUser = (key, value) => {
  const user = db.users.list().find(user => user[key].toUpperCase() === value.toUpperCase());

  return user;
};

const getUserByEmailAddress = (req, res, next) => {
  const user = getUser("emailAddress", req.params.emailAddress);

  return res.json({ user, success: true });
};

const getUserByUserName = (req, res, next) => {
  const user = getUser("userName", req.params.userName);

  return res.json({ user, success: true });
};

const getUsers = (req, res, next) => {
  const users = db.users.list();

  return res.json({ users, success: true });
};

const updateUser = (req, res, next) => {
  if (req.body.id) delete req.body.id;

  const user = getUser("userName", req.params.userName);
  db.users.update({ ...user, ...req.body });

  return res.json({ user: db.users.get(user.id), success: true });
};

module.exports = {
  createUser,
  deleteUser,
  getUserByEmailAddress,
  getUserByUserName,
  getUsers,
  updateUser
};
