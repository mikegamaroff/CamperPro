// camperprodb.ts
import dotenv from "dotenv";
import nano from "nano";
dotenv.config({ path: "./.env.local" });
function createDbInstancedd() {
  const dbUrl = `http://${process.env.COUCHDB_USER}:${process.env.COUCHDB_PASSWORD}@${process.env.COUCHDB_URL}:${process.env.COUCHDB_PORT}`;
  const dbName = process.env.COUCHDB_NAME;
  console.log(process.env.COUCHDB_USER);

  if (!dbName) {
    throw new Error("COUCHDB_NAME environment variable is not defined");
  }

  const nanoInstance = nano(dbUrl);
  const db = nanoInstance.use(dbName);
  return db;
}

export default createDbInstancedd;
