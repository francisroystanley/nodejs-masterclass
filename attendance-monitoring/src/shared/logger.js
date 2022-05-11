const EventEmitter = require("events");
const fs = require("fs");

class LogEmitter extends EventEmitter {
  constructor(path) {
    super();
    if (!fs.existsSync(path)) fs.mkdirSync(path);
  }

  log(data) {
    this.emit("write", data);
  }
}

module.exports = LogEmitter;
