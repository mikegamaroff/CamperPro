// pages/api/campsites.ts
import { Campsite } from '@model/campsite';
import authenticateJWT from '@utils/authenticateJSW';
import { buildMangoQuery } from '@utils/buildFilterQuery';
import createDbInstance from '@utils/camperprodb';
import handleAuthError from '@utils/handleAuthError';
import { isCouchDbError } from '@utils/isCouchDbError';
import { DocumentResponseRow } from 'nano';
import { NextApiRequest, NextApiResponse } from 'next';

async function addCampsite(req: NextApiRequest, res: NextApiResponse<{ message: string }>) {
	const db = createDbInstance();
	const newCampsite: Campsite = req.body;

	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'POST');
	res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

	try {
		const response = await db.insert(newCampsite);
		console.log('Added campsite:', response);
		if (isCouchDbError(response)) {
			console.error('CouchDB error:', response);
			res.status(500).json({ message: 'Internal server error' });
		} else {
			res.status(201).json({ message: `Campsite added with ID: ${response.id}` });
		}
	} catch (error) {
		console.error('Unhandled error:', error);
		res.status(500).json({ message: 'Internal server error' });
	}
}

async function getCampsitesWithFilters(req: NextApiRequest, res: NextApiResponse<{ campsites: Campsite[] }>) {
	const db = createDbInstance();
	const view = (req.query.view || 'non-draft-campsites') as string;
	const filters = req.query.filters ? JSON.parse(req.query.filters as string) : {};

	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET');
	res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

	const attributeFilters = filters.attributes;
	delete filters.attributes;

	try {
		const mangoQuery = buildMangoQuery(filters);
		const mangoResponse = await db.find(mangoQuery);

		let intersectedIds = mangoResponse.docs.map(doc => doc._id);

		if (attributeFilters && Object.keys(attributeFilters).length > 0) {
			const keys = [];
			for (const type in attributeFilters) {
				for (const name of attributeFilters[type]) {
					keys.push([type, name]);
				}
			}

			const viewResponse = await db.view('campsite-view', view, { keys, descending: true, limit: 50 });

			if (isCouchDbError(viewResponse)) {
				console.error('CouchDB error:', viewResponse);
				res.status(500).json({ campsites: [] });
				return;
			} else {
				// Remove duplicates
				const uniqueIds: { [id: string]: true } = {};
				for (const row of viewResponse.rows) {
					const id = row.value as string;
					uniqueIds[id] = true;
				}

				// Intersect IDs from Mango query and attribute query
				intersectedIds = intersectedIds.filter(id => uniqueIds[id]);
			}
		}

		if (intersectedIds.length === 0) {
			res.status(200).json({ campsites: [] }); // Return empty array when no results found
			return;
		}

		// Fetch full documents for each intersected ID
		const campsiteDocs = await db.fetch({ keys: intersectedIds });

		// Extract the actual campsite objects from the docs
		const campsites: Campsite[] = campsiteDocs.rows
			.filter(row => 'doc' in row) // filter out DocumentLookupFailure
			.map(row => (row as DocumentResponseRow<Campsite>).doc as Partial<Campsite>) // Cast row.doc as Partial<Campsite>
			.filter((doc): doc is Campsite => doc !== null); // Filter out any null docs

		res.status(200).json({ campsites });
	} catch (error) {
		console.error('Unhandled error:', error);
		res.status(500).json({ campsites: [] });
	}
}

async function handler(req: NextApiRequest, res: NextApiResponse) {
	try {
		await authenticateJWT(req);
		res.setHeader('Access-Control-Allow-Origin', '*');
		res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT');
		res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

		try {
			if (req.method === 'POST') {
				await addCampsite(req, res);
			} else if (req.method === 'GET') {
				await getCampsitesWithFilters(req, res);
			} else {
				res.setHeader('Allow', ['GET', 'POST', 'PUT']);
				res.status(405).end(`Method ${req.method} Not Allowed`);
			}
		} catch (error) {
			console.error(error);
			res.status(500).json({ message: 'Internal server error' });
		}
	} catch (err) {
		handleAuthError(err, res);
	}
}

export default handler;
