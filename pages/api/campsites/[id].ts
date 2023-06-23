import { Campsite } from '@model/campsite';
import { Review } from '@model/review';
import { User } from '@model/user';
import authenticateJWT from '@utils/authenticateJSW';
import { createDbInstance } from '@utils/camperprodbWrapper';
import handleAuthError from '@utils/handleAuthError';
import { isCouchDbError } from '@utils/isCouchDbError';
import { NextApiRequest, NextApiResponse } from 'next';
import { updateUserDocument } from '.';
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
async function updateCampsite(
	req: NextApiRequest,
	res: NextApiResponse<{ message: string; campsite: Campsite | null }>
) {
	const db = createDbInstance();
	let updatedCampsite: Campsite = req.body;
	if (!req.body._id) {
		res.status(400).json({ message: 'Missing id in request body', campsite: null });
		return;
	}
	const id = req.body._id as string;

	if (!id.startsWith('campsite')) {
		res.status(500).json({ message: 'Not a campsite document', campsite: null });
	}

	try {
		// Fetch the latest document
		const latestDoc = await db.get(id);

		// Merge changes from req.body into the latest document
		updatedCampsite = { ...updatedCampsite, _rev: latestDoc._rev };

		const response = await db.insert(updatedCampsite);
		console.log('Updated campsite:', response);

		if (isCouchDbError(response)) {
			console.error('CouchDB error:', response);
			res.status(500).json({ message: 'Internal server error', campsite: null });
		} else {
			res.status(200).json({ message: `Campsite updated with ID: ${response.id}`, campsite: updatedCampsite });
		}
	} catch (error) {
		console.error('Unhandled error:', error);
		res.status(500).json({ message: 'Internal server error', campsite: null });
	}
}

async function deleteCampsite(req: NextApiRequest, res: NextApiResponse<{ message: string }>) {
	const db = createDbInstance() as ReturnType<typeof createDbInstance>;
	const id = req.query.id as string;
	// Check if the id starts with 'campsite'
	if (!id.startsWith('campsite')) {
		res.status(500).json({ message: 'Not a campsite document' });
	}

	try {
		// Fetch all reviews associated with the campsite
		const reviewResponse = await db.view('review-view', 'reviews-by-campsite', { key: id });

		if (isCouchDbError(reviewResponse)) {
			console.error('CouchDB error:', reviewResponse);
			res.status(500).json({ message: 'Internal server error' });
		} else {
			// Delete each review document individually
			for (const row of reviewResponse.rows) {
				const reviewDoc = row.value as Review; // Assuming your view emits the whole document as value
				const deleteReviewResult = await db.destroy(reviewDoc._id, reviewDoc._rev as string);
				console.log('Deleted review:', deleteReviewResult);
			}
		}

		// Then delete the campsite
		const campsiteResponse = await db.get(id as string);
		if (isCouchDbError(campsiteResponse)) {
			console.error('CouchDB error:', campsiteResponse);
			res.status(500).json({ message: 'Internal server error' });
		} else {
			const campsite = campsiteResponse as Campsite; // Cast the response as Campsite

			// Fetch the user who is the author of the campsite
			if (campsite.author) {
				const user = (await db.get(campsite.author)) as User; // Cast here
				const index = user.campsites.indexOf(campsite._id as string);

				if (index > -1) {
					user.campsites.splice(index, 1);
					// Update the user document
					const updateUserResponse = await updateUserDocument(db, user);
					if (updateUserResponse.error) {
						throw new Error(updateUserResponse.message);
					}
				}
			}
			const deleteCampsiteResult = await db.destroy(campsiteResponse._id, campsiteResponse._rev);
			console.log('Deleted campsite:', deleteCampsiteResult);
			res.status(200).json({ message: `Campsite and associated reviews deleted with ID: ${id}` });
		}
	} catch (error) {
		console.error('Error in [descriptive location]:', error);
		res.status(500).json({ message: 'Internal server error' });
	}
}

async function handler(req: NextApiRequest, res: NextApiResponse) {
	try {
		await authenticateJWT(req);
		res.setHeader('Access-Control-Allow-Origin', '*');
		res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, DELETE');
		res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

		try {
			if (req.method === 'GET') {
				await getCampsiteById(req, res);
			} else if (req.method === 'PUT') {
				await updateCampsite(req, res);
			} else if (req.method === 'DELETE') {
				await deleteCampsite(req, res);
			} else {
				res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
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
