/* eslint-disable @typescript-eslint/no-var-requires */
'use strict';
const nano = require('nano');

// camperprodb.js
require('dotenv').config({ path: './.env.local' });

function createDbInstanceJs() {
	const dbUrl = process.env.COUCHDB_URL;
	const dbName = process.env.COUCHDB_NAME;
	console.log(dbUrl);
	if (!dbName) {
		throw new Error('COUCHDB_NAME environment variable is not defined');
	}

	const nanoInstance = nano(dbUrl);
	const db = nanoInstance.use(dbName);
	return db;
}

module.exports = {
	createDbInstance: createDbInstanceJs,
	dbInstanceType: typeof createDbInstanceJs()
};
