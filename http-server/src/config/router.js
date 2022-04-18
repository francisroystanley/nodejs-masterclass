const { Router } = require("express");

const { userRouter } = require("../routers");

const mainRouter = Router();

mainRouter.use("/users", userRouter);

module.exports = app => {
  app.use("/", mainRouter);
};
