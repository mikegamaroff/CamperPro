/* eslint-disable @typescript-eslint/no-var-requires */
const dotenv = require('dotenv');
dotenv.config({ path: './.env.local' });

const couchdbHost = process.env.COUCHDB_URL;
const cloudantHost = process.env.CLOUDANT_URL;

const nano = require('nano')(couchdbHost);
const cloudantNano = require('nano')(cloudantHost);

const dbName = 'camperpro';
const userDesignDocName = 'user-view';
const userDesignDoc = {
	_id: `_design/${userDesignDocName}`,
	views: {
		'all-users': {
			map: `
				function (doc) {
					if (doc.type === 'user') {
						emit(doc.email, doc);
					}
				}
			`
		},
		'all-users-by-date': {
			map: `
                function (doc) {
                    if (doc.type === 'user' && doc.created_at) {
                        emit(doc.created_at, doc);
                    }
                }
            `
		},
		'user-by-id': {
			map: `
			function (doc) {
				if (doc.type === 'user') {
					emit(doc._id, doc);
				}
			}
            `
		}
		// Add more views here if needed
	},
	language: 'javascript'
};

const campsiteDesignDocName = 'campsite-view';
const campsiteDesignDoc = {
	_id: `_design/${campsiteDesignDocName}`,
	views: {
		'all-campsites': {
			map: `
				function (doc) {
					if (doc.type === 'campsite') {
						emit(doc.title, doc);
					}
				}
			`
		},
		'all-campsites-by-date': {
			map: `
                function (doc) {
                    if (doc.type === 'campsite' && doc.created_at) {
                        emit(doc.created_at, doc);
                    }
                }
            `
		},
		'non-draft-campsites': {
			map: `
			function (doc) {
				if (doc.type === 'campsite' && doc.draft === false) {
				  for (var attrType in doc.attributes) {
					for (var i = 0; i < doc.attributes[attrType].length; i++) {
					  emit([attrType, doc.attributes[attrType][i]], doc._id);
					}
				  }
				}
			  }
		  `
		},
		'campsite-author-search': {
			map: `
			function (doc) {
				if (doc.type === 'campsite' && !doc.draft) {
					emit(doc.author, doc);
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

function handleDesignDoc(db, designDoc) {
	db.get(designDoc._id, (err, existingDoc) => {
		if (err && err.statusCode === 404) {
			// Design document does not exist, create it
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
		// Database does not exist, create it and add the design documents
		nano.db.create(dbName, err => {
			if (err) {
				console.error('Error creating database:', err);
				return;
			}

			const db = nano.use(dbName);
			handleDesignDoc(db, userDesignDoc);
			handleDesignDoc(db, campsiteDesignDoc);
		});
	} else if (err) {
		console.error('Error checking database existence:', err);
	} else {
		// Database exists, handle the design documents
		const db = nano.use(dbName);
		handleDesignDoc(db, userDesignDoc);
		handleDesignDoc(db, campsiteDesignDoc);
	}
});
