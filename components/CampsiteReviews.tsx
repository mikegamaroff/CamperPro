import React, { useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { AuthContext } from '../context/authContext';
import { ReviewContext } from '../context/reviewContext';
import { Campsite } from '../model/campsite';
import { EmptyNewReview, Review } from '../model/review';
import { useAddReview } from '../routes/useAddReview';
import { useGetReviewsByCampsite } from '../routes/useGetReviewsByCampsite';
import Button from './Forms/Button';

interface CampsiteReviewsProps {
	campsite: Campsite;
}

export const CampsiteReviews: React.FC<CampsiteReviewsProps> = ({ campsite }) => {
	const { isLoading } = useGetReviewsByCampsite(campsite._id);
	const { addReview, isLoading: addCampsiteLoading, isError, isSuccess } = useAddReview();
	const { reviews, setReviews } = useContext(ReviewContext);
	const { authUser } = useContext(AuthContext); // Access user and status from the AuthContext
	console.log(reviews);

	const handleAddReview = async () => {
		const newId = uuidv4(); // replace this with your ID generation logic
		const newReview: Review = {
			...EmptyNewReview,
			_id: 'review:' + newId,
			campsite: campsite._id as string,
			rating: 0,
			title: 'Test Review',
			review: 'Here is my nice review that should be read',
			author: authUser?.id as string
		};

		try {
			const response = await addReview(newReview);

			if (response.success) {
				setReviews([...reviews, newReview]);
				console.log(response);
			} else {
				console.error('Error adding campsite:', response.message);
			}
		} catch (error) {
			console.error('Error adding campsite:', error instanceof Error ? error.message : 'Unknown error');
		}
	};
	return (
		<div>
			<div>Map through the reviews object here. There are currently {reviews.length} to use.</div>
			<Button onClick={handleAddReview}>Add Review</Button>
		</div>
	);
};
