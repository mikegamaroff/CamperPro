import { Campsite } from '@model/campsite';
import { Trip } from '@model/trips';
import authenticateJWT from '@utils/authenticateJSW';
import { createDbInstance } from '@utils/camperprodbWrapper';
import handleAuthError from '@utils/handleAuthError';
import { isCouchDbError } from '@utils/isCouchDbError';
import { NextApiRequest, NextApiResponse } from 'next';
async function getTripById(req: NextApiRequest, res: NextApiResponse<{ trip: Trip | null }>) {
	try {
		await authenticateJWT(req);
		const db = createDbInstance();
		const tripId = req.query.id as string;

		// Check if the id starts with 'trip'
		if (!tripId.startsWith('trip')) {
			res.status(500).json({ trip: null });
		}

		const doc = (await db.get(tripId)) as Trip;
		// Check if the doc type is 'trip'
		if (doc.type !== 'trip') {
			res.status(500).json({ trip: null });
		}
		const trip = doc as Trip;

		res.status(200).json({ trip });
	} catch (error) {
		console.error('Error retrieving trip:', error);
		res.status(500).json({ trip: null });
	}
}

// Add the updateTrip function
async function updateTrip(req: NextApiRequest, res: NextApiResponse<{ message: string }>) {
	const db = createDbInstance();
	const updatedTrip: Trip = req.body;

	if (!updatedTrip._id.startsWith('trip')) {
		res.status(500).json({ message: 'Not a trip document' });
	}
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'PUT');
	res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

	try {
		const response = await db.insert(updatedTrip);
		console.log('Updated trip:', response);
		if (isCouchDbError(response)) {
			console.error('CouchDB error:', response);
			res.status(500).json({ message: 'Internal server error' });
		} else {
			res.status(200).json({ message: `Trip updated with ID: ${response.id}` });
		}
	} catch (error) {
		console.error('Unhandled error:', error);
		res.status(500).json({ message: 'Internal server error' });
	}
}

async function deleteTrip(req: NextApiRequest, res: NextApiResponse<{ message: string }>) {
	const db = createDbInstance() as ReturnType<typeof createDbInstance>;
	const id = req.query.id as string;
	// Check if the id starts with 'trip'
	if (!id.startsWith('trip')) {
		res.status(500).json({ message: 'Not a trip document' });
	}
	try {
		// Fetch the trip document
		const tripResponse = await db.get(id as string);
		if (isCouchDbError(tripResponse)) {
			console.error('CouchDB error:', tripResponse);
			res.status(500).json({ message: 'Internal server error' });
		} else {
			// Cast the fetched document as a Trip
			const tripToDelete: Trip = tripResponse as Trip;

			// Fetch the associated campsite
			const campsiteResponse = await db.get(tripToDelete.campsite);
			const campsite: Campsite = campsiteResponse as Campsite;

			// Update the rating and tripsCount.
			campsite.tripsCount = campsite.tripsCount || 0;
			campsite.tripsCount -= 1;

			// Save the updated campsite back to the database.
			await db.insert(campsite);

			// Delete the trip document
			const result = await db.destroy(tripResponse._id, tripResponse._rev);
			console.log('Deleted trip:', result);
			res.status(200).json({ message: `Trip deleted with ID: ${id}` });
		}
	} catch (error) {
		console.error('Unhandled error:', error);
		res.status(500).json({ message: 'Internal server error' });
	}
}

async function handler(req: NextApiRequest, res: NextApiResponse) {
	try {
		await authenticateJWT(req);
		res.setHeader('Access-Control-Allow-Origin', '*');
		res.setHeader('Access-Control-Allow-Methods', 'GET');
		res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

		try {
			if (req.method === 'GET') {
				await getTripById(req, res);
			} else if (req.method === 'PUT') {
				await updateTrip(req, res);
			} else if (req.method === 'DELETE') {
				await deleteTrip(req, res);
			} else {
				res.setHeader('Allow', ['GET']);
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
