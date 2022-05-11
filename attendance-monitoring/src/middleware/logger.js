const fs = require("fs");
const path = require("path");
const moment = require("moment");

const { Logger } = require("../shared");

const logPath = path.join(process.cwd(), "logs");
const logger = new Logger(logPath);

logger.on("write", ({ path: _path, query, method, body }) => {
  const today = moment(new Date());
  const logFileName = `AttendanceMonitoringLogs-[${today.format("YYYY-MM-DD")}].log`;
  const currentTime = today.format("YYYY-MM-DD HH:mm");
  const stream = fs.createWriteStream(path.join(logPath, logFileName), { flags: "a" });

  stream.write(`[${currentTime}] ${method} ${_path} ${JSON.stringify(query)} ${JSON.stringify(body)}\n`);
});

module.exports = logger;
