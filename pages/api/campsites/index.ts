// pages/api/campsites.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { Campsite } from '../../../model/campsite';
import createDbInstance from '../../../util/camperprodb';
import { isCouchDbError } from '../../../util/isCouchDbError';

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

async function getAllCampsites(req: NextApiRequest, res: NextApiResponse<{ campsites: Campsite[] }>) {
	const db = createDbInstance();

	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET');
	res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

	try {
		const response = await db.view('campsite-view', 'all-campsites');
		if (isCouchDbError(response)) {
			console.error('CouchDB error:', response);
			res.status(500).json({ campsites: [] });
		} else {
			res.status(200).json({ campsites: response.rows.map(row => row.value as Campsite) });
		}
	} catch (error) {
		console.error('Unhandled error:', error);
		res.status(500).json({ campsites: [] });
	}
}

// ... (existing functions: addCampsite and getAllCampsites)

async function handler(req: NextApiRequest, res: NextApiResponse) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT');
	res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

	try {
		if (req.method === 'POST') {
			await addCampsite(req, res);
		} else if (req.method === 'GET') {
			await getAllCampsites(req, res);
		} else {
			res.setHeader('Allow', ['GET', 'POST', 'PUT']);
			res.status(405).end(`Method ${req.method} Not Allowed`);
		}
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Internal server error' });
	}
}

export default handler;
