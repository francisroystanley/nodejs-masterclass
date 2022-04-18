const { Router } = require("express");

const { userController } = require("../controllers");
const { userValidation } = require("../middleware");

const userRouter = Router();

userRouter
  .route("/")
  .get(userController.getUsers)
  .post(userValidation.validateCreate, userController.createUser);

userRouter
  .route("/user/email/:emailAddress")
  .get(userValidation.validateEmailAddress, userController.getUserByEmailAddress);

userRouter
  .route("/user/:userName")
  .get(userValidation.validateUserName, userController.getUserByUserName)
  .patch(userValidation.validateUpdate, userController.updateUser)
  .delete(userValidation.validateDelete, userController.deleteUser);

module.exports = userRouter;
