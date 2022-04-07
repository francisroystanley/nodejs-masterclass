const fs = require("fs");

fs.watch(".", { recursive: true }, (e, file) => {
  fs.readFile(file, "utf8", (err, content) => {
    console.log(e);

    if (content.toUpperCase().includes("FRANCIS")) {
      console.log(file);
    }
  });
});
