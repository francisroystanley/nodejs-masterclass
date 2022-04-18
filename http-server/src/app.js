const express = require("express");
const fs = require("fs");
const logger = require("morgan");
const moment = require("moment");
const path = require("path");

const configs = require("./config");

const app = express();
const logPath = path.join(__dirname, "..", "outputs");
const logFileName = "access.log";
const port = 9000;

if (!fs.existsSync(logPath)) fs.mkdirSync(logPath);

const accessLogStream = fs.createWriteStream(path.join(logPath, logFileName), { flags: "a" });

logger.token("date", () => moment(new Date()).format("YYYY-MM-DD-HH:mm"));

app.use(logger(":date :method :url :status", { stream: accessLogStream }));

app.use(express.json());

configs.routerConfig(app);

app.listen(port, () => console.info(`Server started on port ${port}`));
