const { DataStore } = require("notarealdb");

const store = new DataStore("./src/database/data");

module.exports = {
  users: store.collection("users")
};
