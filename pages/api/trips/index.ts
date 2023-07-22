// pages/api/trips.ts
import { Campsite } from '@model/campsite';
import { Trip } from '@model/trips';
import authenticateJWT from '@utils/authenticateJSW';
import createDbInstance from '@utils/camperprodb';
import handleAuthError from '@utils/handleAuthError';
import { isCouchDbError } from '@utils/isCouchDbError';
import { DocumentGetResponse } from 'nano';
import { NextApiRequest, NextApiResponse } from 'next';

async function addTrip(req: NextApiRequest, res: NextApiResponse<{ message: string; campsite: Campsite | null }>) {
	const db = createDbInstance();
	const newTrip: Trip = req.body;

	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'POST');
	res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

	try {
		const response = await db.insert(newTrip);
		console.log('Added trip:', response);

		if (isCouchDbError(response)) {
			console.error('CouchDB error:', response);
			res.status(500).json({ message: 'Internal server error', campsite: null });
		} else {
			const campsiteResponse: DocumentGetResponse = await db.get(newTrip.campsite);
			const campsite: Campsite = campsiteResponse as Campsite;
			campsite.tripsCount = campsite.tripsCount || 0;
			campsite.tripsCount += 1;
			await db.insert(campsite);
			res.status(201).json({ message: `Trip added with ID: ${response.id}`, campsite });
		}
	} catch (error) {
		console.error('Unhandled error:', error);
		res.status(500).json({ message: 'Internal server error', campsite: null });
	}
}

async function getTripsForCampsite(req: NextApiRequest, res: NextApiResponse<{ trips: Trip[] }>) {
	const db = createDbInstance();
	const campsiteId = (req.query.campsite || '') as string;

	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET');
	res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

	try {
		const response = await db.view('trip-view', 'trips-by-campsite', {
			key: campsiteId,
			descending: true,
			limit: 50
		});

		if (isCouchDbError(response)) {
			console.error('CouchDB error:', response);
			res.status(500).json({ trips: [] });
		} else {
			// Check if there are no results
			if (response.rows.length === 0) {
				res.status(200).json({ trips: [] }); // Return empty array when no results found
				return;
			}

			// Extract the actual trip objects from the rows
			const trips: Trip[] = response.rows
				.map(row => row.value as Partial<Trip>) // Cast row.value as Partial<Trip>
				.filter((doc): doc is Trip => doc !== null); // Filter out any null docs
			res.status(200).json({ trips });
		}
	} catch (error) {
		console.error('Unhandled error:', error);
		res.status(500).json({ trips: [] });
	}
}
async function getTripsByCamper(req: NextApiRequest, res: NextApiResponse<{ trips: Trip[] }>) {
	const db = createDbInstance();
	const camperId = (req.query.camper || '') as string;

	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET');
	res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

	try {
		const response = await db.view('trip-view', 'trips-camper-search', {
			key: camperId,
			descending: true,
			limit: 50
		});

		if (isCouchDbError(response)) {
			console.error('CouchDB error:', response);
			res.status(500).json({ trips: [] });
		} else {
			if (response.rows.length === 0) {
				res.status(200).json({ trips: [] });
				return;
			}

			const trips: Trip[] = response.rows
				.map(row => row.value as Partial<Trip>)
				.filter((doc): doc is Trip => doc !== null);
			res.status(200).json({ trips });
		}
	} catch (error) {
		console.error('Unhandled error:', error);
		res.status(500).json({ trips: [] });
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
				await addTrip(req, res);
			} else if (req.method === 'GET') {
				if (req.query.camper) {
					await getTripsByCamper(req, res);
				} else {
					await getTripsForCampsite(req, res);
				}
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
