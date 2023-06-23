/* eslint-disable @typescript-eslint/no-var-requires */
'use strict';
const { createDbInstance } = require('./util/camperprodbjs');

const db = createDbInstance();

const indexes = [
	{ name: 'private-index', fields: ['private'] },
	{ name: 'rating-index', fields: ['rating'] },
	{ name: 'location-index', fields: ['location.state', 'location.nearestTown'] },
	{ name: 'pricePerNight-index', fields: ['pricePerNight'] },
	{ name: 'tentSites-index', fields: ['capacity.numberOfTentSites'] },
	{ name: 'acreage-index', fields: ['capacity.acreage'] },
	{ name: 'active-draft-index', fields: ['active', 'draft'] },
	{ name: 'location-state-index', fields: ['location.state'] },
	{ name: 'location-nearestTown-index', fields: ['location.nearestTown'] }
];

async function createIndex(index) {
	try {
		const response = await db.createIndex({
			index: {
				fields: index.fields
			},
			name: index.name,
			type: 'json'
		});

		console.log(`Index ${index.name} created successfully`, response);
	} catch (err) {
		console.error('Error creating index:', err);
	}
}

async function createIndexes() {
	for (const index of indexes) {
		await createIndex(index);
	}
}

createIndexes();
