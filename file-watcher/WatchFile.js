const EventEmitter = require("events");
const fs = require("fs");
const path = require("path");

class WatchFile extends EventEmitter {
  constructor({ name, path }) {
    super();
    this.name = name;
    this.path = path;
  }

  watch() {
    fs.watch(this.path, { recursive: true }, (e, file) => {
      const content = fs.readFileSync(file, "utf8");

      if (content.toUpperCase().includes(this.name.toUpperCase())) this.emit("nameFoundOnFile", path.basename(file));
    });
  }
}

module.exports = WatchFile;
