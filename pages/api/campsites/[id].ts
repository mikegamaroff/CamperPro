import { NextApiRequest, NextApiResponse } from 'next';
import { Campsite } from '../../../model/campsite';
import authenticateJWT from '../../../util/authenticateJSW';
import { createDbInstance } from '../../../util/camperprodbWrapper';
import handleAuthError from '../../../util/handleAuthError';
import { isCouchDbError } from '../../../util/isCouchDbError';
async function getCampsiteById(req: NextApiRequest, res: NextApiResponse<{ campsite: Campsite | null }>) {
	try {
		await authenticateJWT(req);
		const db = createDbInstance();
		const campsiteId = req.query.id as string;

		// Check if the id starts with 'campsite'
		if (!campsiteId.startsWith('campsite')) {
			res.status(500).json({ campsite: null });
		}

		const doc = (await db.get(campsiteId)) as Campsite;

		// Check if the doc type is 'campsite'
		if (doc.type !== 'campsite') {
			res.status(500).json({ campsite: null });
		}
		const campsite = doc as Campsite;
		res.status(200).json({ campsite });
	} catch (error) {
		console.error('Error retrieving campsite:', error);
		res.status(500).json({ campsite: null });
	}
}

// Add the updateCampsite function
async function updateCampsite(req: NextApiRequest, res: NextApiResponse<{ message: string }>) {
	const db = createDbInstance();
	const updatedCampsite: Campsite = req.body;
	const id = req.body.id as string;
	if (!id.startsWith('campsite')) {
		res.status(500).json({ message: 'Not a review document' });
	}
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'PUT');
	res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

	try {
		const response = await db.insert(updatedCampsite);
		console.log('Updated campsite:', response);
		if (isCouchDbError(response)) {
			console.error('CouchDB error:', response);
			res.status(500).json({ message: 'Internal server error' });
		} else {
			res.status(200).json({ message: `Campsite updated with ID: ${response.id}` });
		}
	} catch (error) {
		console.error('Unhandled error:', error);
		res.status(500).json({ message: 'Internal server error' });
	}
}

// Add the updateCampsite function
async function deleteCampsite(req: NextApiRequest, res: NextApiResponse<{ message: string }>) {
	const db = createDbInstance() as ReturnType<typeof createDbInstance>;
	const id = req.query.id as string;

	// Check if the id starts with 'campsite'
	if (!id.startsWith('campsite')) {
		res.status(500).json({ message: 'Not a campsite document' });
	}

	try {
		const response = await db.get(id as string);
		if (isCouchDbError(response)) {
			console.error('CouchDB error:', response);
			res.status(500).json({ message: 'Internal server error' });
		} else {
			const result = await db.destroy(response._id, response._rev);
			console.log('Deleted campsite:', result);
			res.status(200).json({ message: `Campsite deleted with ID: ${id}` });
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
				await getCampsiteById(req, res);
			} else if (req.method === 'PUT') {
				await updateCampsite(req, res);
			} else if (req.method === 'DELETE') {
				await deleteCampsite(req, res);
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
