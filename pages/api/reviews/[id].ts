import { Campsite } from '@model/campsite';
import { Review } from '@model/review';
import authenticateJWT from '@utils/authenticateJSW';
import { createDbInstance } from '@utils/camperprodbWrapper';
import handleAuthError from '@utils/handleAuthError';
import { isCouchDbError } from '@utils/isCouchDbError';
import { NextApiRequest, NextApiResponse } from 'next';
async function getReviewById(req: NextApiRequest, res: NextApiResponse<{ review: Review | null }>) {
	try {
		await authenticateJWT(req);
		const db = createDbInstance();
		const reviewId = req.query.id as string;

		// Check if the id starts with 'review'
		if (!reviewId.startsWith('review')) {
			res.status(500).json({ review: null });
		}

		const doc = (await db.get(reviewId)) as Review;

		// Check if the doc type is 'review'
		if (doc.type !== 'review') {
			res.status(500).json({ review: null });
		}
		const review = doc as Review;
		res.status(200).json({ review });
	} catch (error) {
		console.error('Error retrieving review:', error);
		res.status(500).json({ review: null });
	}
}

// Add the updateReview function
async function updateReview(req: NextApiRequest, res: NextApiResponse<{ message: string }>) {
	const db = createDbInstance();
	const updatedReview: Review = req.body;

	if (!updatedReview._id.startsWith('review')) {
		res.status(500).json({ message: 'Not a review document' });
	}
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'PUT');
	res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

	try {
		const response = await db.insert(updatedReview);
		console.log('Updated review:', response);
		if (isCouchDbError(response)) {
			console.error('CouchDB error:', response);
			res.status(500).json({ message: 'Internal server error' });
		} else {
			res.status(200).json({ message: `Review updated with ID: ${response.id}` });
		}
	} catch (error) {
		console.error('Unhandled error:', error);
		res.status(500).json({ message: 'Internal server error' });
	}
}

async function deleteReview(req: NextApiRequest, res: NextApiResponse<{ message: string }>) {
	const db = createDbInstance() as ReturnType<typeof createDbInstance>;
	const id = req.query.id as string;
	// Check if the id starts with 'review'
	if (!id.startsWith('review')) {
		res.status(500).json({ message: 'Not a review document' });
	}
	try {
		// Fetch the review document
		const reviewResponse = await db.get(id as string);
		if (isCouchDbError(reviewResponse)) {
			console.error('CouchDB error:', reviewResponse);
			res.status(500).json({ message: 'Internal server error' });
		} else {
			// Cast the fetched document as a Review
			const reviewToDelete: Review = reviewResponse as Review;

			// Fetch the associated campsite
			const campsiteResponse = await db.get(reviewToDelete.campsite);
			const campsite: Campsite = campsiteResponse as Campsite;

			// Update the rating and reviewsCount.
			campsite.rating = campsite.rating || 0;
			campsite.reviewsCount = campsite.reviewsCount || 0;

			let totalRatings = campsite.rating * campsite.reviewsCount;
			totalRatings -= reviewToDelete.rating;
			campsite.reviewsCount -= 1;
			campsite.rating = campsite.reviewsCount > 0 ? totalRatings / campsite.reviewsCount : 0;

			// Save the updated campsite back to the database.
			await db.insert(campsite);

			// Delete the review document
			const result = await db.destroy(reviewResponse._id, reviewResponse._rev);
			console.log('Deleted review:', result);
			res.status(200).json({ message: `Review deleted with ID: ${id}` });
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
				await getReviewById(req, res);
			} else if (req.method === 'PUT') {
				await updateReview(req, res);
			} else if (req.method === 'DELETE') {
				await deleteReview(req, res);
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
