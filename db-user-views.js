const dotenv = require('dotenv');
dotenv.config({ path: './.env.local' });

const couchdbHost = process.env.COUCHDB_URL;

const nano = require('nano')(couchdbHost);

const dbName = 'camperpro';
const designDocName = 'user-view';

const designDoc = {
	_id: `_design/${designDocName}`,
	views: {
		'all-users': {
			map: function (doc) {
				if (doc.type === 'user') {
					emit(doc._id, doc);
				}
			}
				.toString()
				.replace(/\n\t\t\t/g, ' ')
				.replace(/\t/g, '')
		}
		// Add more views here if needed
	},
	language: 'javascript'
};

// Create or update the design document
function createOrUpdateDesignDoc(db) {
	db.get(designDoc._id, (err, existingDoc) => {
		if (err && err.statusCode === 404) {
			// Design document does not exist, create it
			db.insert(designDoc, (err, body) => {
				if (err) {
					console.error('Error inserting design document:', err);
					return;
				}

				console.log('Design document created successfully');
			});
		} else if (err) {
			console.error('Error getting design document:', err);
		} else {
			// Design document exists, update it if the views have changed
			const currentViews = existingDoc.views;
			const newViews = designDoc.views;

			if (JSON.stringify(currentViews) !== JSON.stringify(newViews)) {
				existingDoc.views = newViews;

				db.insert(existingDoc, (err, body) => {
					if (err) {
						console.error('Error updating design document:', err);
						return;
					}

					console.log('Design document updated successfully');
				});
			} else {
				console.log('Design document is up-to-date');
			}
		}
	});
}

// Check if the database exists
nano.db.get(dbName, (err, body) => {
	if (err && err.statusCode === 404) {
		// Database does not exist, create it and add the design document
		nano.db.create(dbName, (err, body) => {
			if (err) {
				console.error('Error creating database:', err);
				return;
			}

			const db = nano.use(dbName);
			createOrUpdateDesignDoc(db);
		});
	} else if (err) {
		console.error('Error checking database existence:', err);
	} else {
		// Database exists, create or update the design document
		const db = nano.use(dbName);
		createOrUpdateDesignDoc(db);
	}
});
