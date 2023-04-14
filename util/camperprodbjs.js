'use strict';
const nano = require('nano');

// camperprodb.js
const dotenv = require('dotenv');
dotenv.config({ path: './.env.local' });

function createDbInstanceJs() {
	const dbUrl = process.env.COUCHDB_URL;
	const dbName = process.env.COUCHDB_NAME;
	console.log(dbUrl);
	if (!dbName) {
		throw new Error('COUCHDB_NAME environment variable is not defined');
	}

	var nanoInstance = nano(dbUrl);
	var db = nanoInstance.use(dbName);
	return db;
}

module.exports = createDbInstanceJs;
