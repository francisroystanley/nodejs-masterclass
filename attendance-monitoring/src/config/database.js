const mongoose = require("mongoose");

const DB_USERNAME = "root";
const DB_PASSWORD = "dynViCMf06YhaAgG";
const DB_HOST = "cluster1.rfdm7.mongodb.net";
const DB_NAME = "attendance-monitoring";
const DB_STRING = `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority`;
const connection = mongoose.connection;
const connect = mongoose.connect(DB_STRING, { useNewUrlParser: true });

mongoose.set("toJSON", { versionKey: false });
mongoose.set("returnOriginal", false);

connection.on("open", () => console.log("Connected to mongodb"));

connection.on("error", err => console.log(err));

module.exports = connect;
