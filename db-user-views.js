/* eslint-disable @typescript-eslint/no-var-requires */
const dotenv = require('dotenv');
dotenv.config({ path: './.env.local' });

const couchdbHost = process.env.COUCHDB_URL;
const cloudantHost = process.env.CLOUDANT_URL;

const nano = require('nano')(couchdbHost);
const cloudantNano = require('nano')(cloudantHost);

const dbName = 'camperpro';
const designDocName = 'user-view';
const designDoc = {
	_id: `_design/${designDocName}`,
	views: {
		'all-users': {
			map: `
				function (doc) {
					if (doc.type === 'user') {
						emit(doc.email, doc);
					}
				}
			`
		}
		// Add more views here if needed
	},
	language: 'javascript'
};
function replicateDatabase(sourceDb, targetNano, dbName, continuous) {
	const targetDbUrl = `${targetNano.config.url}/${dbName}`;
	sourceDb.replicate(targetDbUrl, { create_target: true, continuous }, err => {
		if (err) {
			console.error('Error replicating database:', err);
			return;
		}
		console.log('Database replication successful:');
	});
}

function handleDesignDoc(db) {
	db.get(designDoc._id, (err, existingDoc) => {
		if (err && err.statusCode === 404) {
			// Design document does not exist, create itås
			db.insert(designDoc, err => {
				if (err) {
					console.error('Error inserting design document:', err);
					return;
				}

				console.log('Design document created successfully');
				replicateDatabase(db, cloudantNano, dbName, false);
			});
		} else if (err) {
			console.error('Error getting design document:', err);
		} else {
			// Design document exists, delete it first
			db.destroy(existingDoc._id, existingDoc._rev, err => {
				if (err) {
					console.error('Error deleting existing design document:', err);
					return;
				}

				// Insert the new design document
				db.insert(designDoc, err => {
					if (err) {
						console.error('Error inserting new design document:', err);
						return;
					}

					console.log('Design document updated successfully');
					replicateDatabase(db, cloudantNano, dbName, false);
				});
			});
		}
	});
}

nano.db.get(dbName, err => {
	if (err && err.statusCode === 404) {
		// Database does not exist, create it and add the design document
		nano.db.create(dbName, err => {
			if (err) {
				console.error('Error creating database:', err);
				return;
			}

			const db = nano.use(dbName);
			handleDesignDoc(db);
		});
	} else if (err) {
		console.error('Error checking database existence:', err);
	} else {
		// Database exists, handle the design document
		const db = nano.use(dbName);
		handleDesignDoc(db);
	}
});
