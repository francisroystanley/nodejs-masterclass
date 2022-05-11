const { Router } = require("express");

const { attendanceRoute, eventRoute, memberRoute } = require("../routes");
const { loggerMiddleware } = require("../middleware");

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

  app.use((req, res, next) => res.status(404).send("URL Not Found!"));
};
