// camperprodb.ts
import dotenv from 'dotenv';
import nano from 'nano';
dotenv.config({ path: './.env.local' });
function createDbInstancedd() {
	const dbUrl = process.env.COUCHDB_URL;
	const dbName = process.env.COUCHDB_NAME;

	if (!dbName) {
		throw new Error('COUCHDB_NAME environment variable is not defined');
	}

	const nanoInstance = dbUrl ? nano(dbUrl) : null;
	if (!nanoInstance) {
		throw new Error('COUCHDB_URL environment variable is not defined');
	}

	const db = nanoInstance.use(dbName);
	return db;
}

export default createDbInstancedd;
