// pages/api/reviews.ts
import { DocumentGetResponse, DocumentResponseRow } from 'nano';
import { NextApiRequest, NextApiResponse } from 'next';
import { Campsite } from '../../../model/campsite';
import { Review } from '../../../model/review';
import authenticateJWT from '../../../util/authenticateJSW';
import createDbInstance from '../../../util/camperprodb';
import handleAuthError from '../../../util/handleAuthError';
import { isCouchDbError } from '../../../util/isCouchDbError';

async function addReview(req: NextApiRequest, res: NextApiResponse<{ message: string }>) {
	const db = createDbInstance();
	const newReview: Review = req.body;

	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'POST');
	res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

	try {
		const response = await db.insert(newReview);
		console.log('Added review:', response);
		if (isCouchDbError(response)) {
			console.error('CouchDB error:', response);
			res.status(500).json({ message: 'Internal server error' });
		} else {
			// Get the campsite document.
			const campsiteResponse: DocumentGetResponse = await db.get(newReview.campsite);

			// Since the DocumentGetResponse doesn't necessarily have the fields of the Campsite,
			// we need to cast it to the Campsite type (if we're sure it is a campsite).
			const campsite: Campsite = campsiteResponse as Campsite;

			// Ensure the rating and reviewsCount fields are not null or undefined.
			campsite.rating = campsite.rating || 0;
			campsite.reviewsCount = campsite.reviewsCount || 0;

			// Update the rating and reviewsCount.
			let totalRatings = campsite.rating * campsite.reviewsCount;
			totalRatings += newReview.rating;
			campsite.reviewsCount += 1;
			campsite.rating = totalRatings / campsite.reviewsCount;

			// Save the updated campsite back to the database.
			await db.insert(campsite);

			res.status(201).json({ message: `Review added with ID: ${response.id}` });
		}
	} catch (error) {
		console.error('Unhandled error:', error);
		res.status(500).json({ message: 'Internal server error' });
	}
}

async function getReviewsForCampsite(req: NextApiRequest, res: NextApiResponse<{ reviews: Review[] }>) {
	const db = createDbInstance();
	const campsiteId = (req.query.campsite || '') as string;

	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET');
	res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

	try {
		const response = await db.view('review-view', 'reviews-by-campsite', {
			key: campsiteId,
			descending: true,
			limit: 50
		});
		console.log(response);
		if (isCouchDbError(response)) {
			console.error('CouchDB error:', response);
			res.status(500).json({ reviews: [] });
		} else {
			// Remove duplicates
			const uniqueIds: { [id: string]: true } = {};
			for (const row of response.rows) {
				const id = row.value as string;
				uniqueIds[id] = true;
			}
			// Check if there are no results
			if (response.rows.length === 0) {
				res.status(200).json({ reviews: [] }); // Return empty array when no results found
				return;
			}

			// Fetch full documents for each unique ID
			const reviewDocs = await db.fetch({ keys: Object.keys(uniqueIds) });

			// Extract the actual review objects from the docs
			const reviews: Review[] = reviewDocs.rows
				.filter(row => 'doc' in row) // filter out DocumentLookupFailure
				.map(row => (row as DocumentResponseRow<Review>).doc as Partial<Review>) // Cast row.doc as Partial<Review>
				.filter((doc): doc is Review => doc !== null); // Filter out any null docs

			res.status(200).json({ reviews });
		}
	} catch (error) {
		console.error('Unhandled error:', error);
		res.status(500).json({ reviews: [] });
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
				await addReview(req, res);
			} else if (req.method === 'GET') {
				await getReviewsForCampsite(req, res);
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
