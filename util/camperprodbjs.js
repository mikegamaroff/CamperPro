'use strict';
import nano from 'nano';

// camperprodb.js
import { config } from 'dotenv';
config({ path: './.env.local' });

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

export const createDbInstance = createDbInstanceJs;
export const dbInstanceType = typeof createDbInstance();
