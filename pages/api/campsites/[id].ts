import { NextApiRequest, NextApiResponse } from 'next';
import { Campsite } from '../../../model/campsite';
import { createDbInstance } from '../../../util/camperprodbWrapper';
import { isCouchDbError } from '../../../util/isCouchDbError';
async function getCampsiteById(req: NextApiRequest, res: NextApiResponse<{ campsite: Campsite | null }>) {
	const db = createDbInstance() as ReturnType<typeof createDbInstance>;
	const { id } = req.query;

	try {
		const response = await db.get(id as string);
		if (isCouchDbError(response)) {
			console.error('CouchDB error:', response);
			res.status(500).json({ campsite: null });
		} else {
			res.status(200).json({ campsite: response as Campsite });
		}
	} catch (error) {
		console.error('Unhandled error:', error);
		res.status(500).json({ campsite: null });
	}
}

// Add the updateCampsite function
async function updateCampsite(req: NextApiRequest, res: NextApiResponse<{ message: string }>) {
	const db = createDbInstance();
	const updatedCampsite: Campsite = req.body;

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
	const { id } = req.query;

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
}

export default handler;
