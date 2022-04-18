const db = require("../database");

const isUserExist = (key, value) => {
  const user = db.users.list().find(user => user[key].toUpperCase() === value.toUpperCase());

  return user;
};

const isValidEmail = email => {
  const re = /^\S+@\S+\.\S+$/;

  return re.test(email);
};

const validateCreate = (req, res, next) => {
  const fields = [
    { field: "userName", name: "Username", required: true, type: "string" },
    {
      field: "emailAddress",
      name: "Email Address",
      required: true,
      type: "string",
      customValidations: [{ validation: isValidEmail, message: "Email Address is not valid!" }]
    },
    { field: "firstName", name: "First Name", required: true, type: "string" },
    { field: "lastName", name: "Last Name", required: true, type: "string" }
  ];
  const data = { ...req.body, method: req.method };
  const { statusCode, error, success } = validateFields(data, fields);

  if (success) return next();

  return res.status(statusCode).json({ error, success });
};

const validateDelete = (req, res, next) => {
  if (isUserExist("userName", req.params.userName)) return next();

  return res.status(404).json({ success: false });
};

const validateEmailAddress = (req, res, next) => {
  const { emailAddress } = req.params;

  if (isUserExist("emailAddress", emailAddress)) return next();

  return res.status(404).json({ success: false });
};

const validateFields = (data, fields) => {
  let error = [];
  let result = { statusCode: 200, success: true };

  fields.forEach(({ field, name, required, type, customValidations }) => {
    if (required && !data[field]) {
      error.push(`${name} is required!`);
    } else if (data[field]) {
      if (typeof data[field] !== type) {
        error.push(`${name} should be ${type}!`);
      } else if (customValidations?.length) {
        customValidations.forEach(cV => {
          const isValid = cV.validation(data[field]);

          if (!isValid) error.push(cV.message);
        });
      }
    }
  });

  if (error.length) {
    result.statusCode = 400;
    result.error = error;
    result.success = false;

    return result;
  }

  if (data.method === "POST") {
    if (isUserExist("userName", data.userName)) error.push("Username already exist!");

    if (isUserExist("emailAddress", data.emailAddress)) error.push("Email Address already exist!");
  } else if (data.method === "PATCH") {
    const currentUser = isUserExist("userName", data.currentUserName);

    if (!currentUser) {
      error.push("Username not found!");
      result.statusCode = 404;
      result.error = error;
      result.success = false;

      return result;
    }

    if (data.userName && currentUser.userName !== data.userName && isUserExist("userName", data.userName)) error.push("Username already exist!");

    if (data.emailAddress && currentUser.emailAddress !== data.emailAddress && isUserExist("emailAddress", data.emailAddress))
      error.push("Email Address already exist!");
  }

  if (error.length) {
    result.statusCode = 409;
    result.error = error;
    result.success = false;
  }

  return result;
};

const validateUpdate = (req, res, next) => {
  const fields = [
    { field: "userName", name: "Username", type: "string" },
    {
      field: "emailAddress",
      name: "Email Address",
      type: "string",
      customValidations: [{ validation: isValidEmail, message: "Email Address is not valid!" }]
    },
    { field: "firstName", name: "First Name", type: "string" },
    { field: "lastName", name: "Last Name", type: "string" }
  ];
  const data = { ...req.body, currentUserName: req.params.userName, method: req.method };
  const { statusCode, error, success } = validateFields(data, fields);

  if (success) return next();

  return res.status(statusCode).json({ error, success });
};

const validateUserName = (req, res, next) => {
  const { userName } = req.params;

  if (isUserExist("userName", userName)) return next();

  return res.status(404).json({ success: false });
};

module.exports = {
  validateCreate,
  validateDelete,
  validateEmailAddress,
  validateUpdate,
  validateUserName
};
