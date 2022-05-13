const { Router } = require("express");

const { attendanceRoute, eventRoute, memberRoute } = require("../routes");
const { loggerMiddleware } = require("../middleware");
const { createInternalError } = require("../middleware/error");

const endpointRouter = Router();

endpointRouter.use("/attendance", attendanceRoute);
endpointRouter.use("/events", eventRoute);
endpointRouter.use("/members", memberRoute);

module.exports = app => {
  app.use((req, res, next) => {
    loggerMiddleware.log(req);
    next();
  });

  app.use("/api", endpointRouter);

  app.use((req, res, next) => next(createInternalError("URL Not Found!", 404)));

  app.use((err, req, res, next) => res.status(err.status).json(err));
};
