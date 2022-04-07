const fs = require("fs");
const { hideBin } = require("yargs/helpers");
const path = require("path");
const notifier = require("node-notifier");
const yargs = require("yargs/yargs");
const WatchFile = require("./WatchFile");

const openToastNotification = file => {
  notifier.notify({
    title: "File Watcher",
    message: `Your name was mentioned on file: ${file}!`
  });
};

const printToConsole = file => {
  console.log(`Your name was mentioned on file: ${file}!`);
};

const validatePath = ({ path: _path }) => {
  if (!fs.existsSync(_path)) throw new Error("Path does not exist!");

  console.log(`Watching path: ${path.resolve(_path)}`);

  return true;
};

const argv = yargs(hideBin(process.argv)).demandOption(["name", "path"]).check(validatePath).argv;

const watchFile = new WatchFile(argv);
watchFile.watch();
watchFile.on("nameFoundOnFile", openToastNotification);
watchFile.on("nameFoundOnFile", printToConsole);
