"use strict";
const nano = require("nano");

// camperprodb.js
const dotenv = require("dotenv");
dotenv.config({ path: "./.env.local" });

function createDbInstance() {
  var dbUrl = "http://"
    .concat(process.env.COUCHDB_USER, ":")
    .concat(process.env.COUCHDB_PASSWORD, "@")
    .concat(process.env.COUCHDB_URL, ":")
    .concat(process.env.COUCHDB_PORT);

  var dbName = process.env.COUCHDB_NAME;
  console.log(dbUrl);
  if (!dbName) {
    throw new Error("COUCHDB_NAME environment variable is not defined");
  }

  var nanoInstance = nano(dbUrl);
  var db = nanoInstance.use(dbName);
  return db;
}

module.exports = createDbInstance;
