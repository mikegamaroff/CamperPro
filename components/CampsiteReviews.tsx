import React from 'react';
import { Campsite } from '../model/campsite';
import { useGetReviewsByCampsite } from '../routes/useGetReviewsByCampsite';

interface CampsiteReviewsProps {
	campsite: Campsite;
}

export const CampsiteReviews: React.FC<CampsiteReviewsProps> = ({ campsite }) => {
	const { reviews, isLoading } = useGetReviewsByCampsite(campsite._id);

	console.log(reviews);
	return <div></div>;
};
