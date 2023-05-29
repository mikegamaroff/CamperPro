// hooks/useGetAllReviews.ts
import { useContext, useState } from 'react';
import { ReviewContext } from '../context/reviewContext';

export const useGetReviewsByCampsite = (campsiteId: string | undefined) => {
	const { reviews, setReviews } = useContext(ReviewContext);
	const [isLoading, setLoading] = useState(false);
	const [isError, setError] = useState<string | null>();

	const getAllReviews = async () => {
		setLoading(true);
		setError(null);

		const url = campsiteId
			? `/api/reviews?view=reviews-by-campsite&campsiteId=${campsiteId}`
			: `/api/reviews?view=reviews-by-campsite`;

		try {
			const response = await fetch(url, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${localStorage.getItem('jwtToken')}`
				}
			});

			if (response.ok) {
				const data = await response.json();
				setReviews(data.reviews);
				setLoading(false);
			} else {
				const errorData = await response.json();
				setLoading(false);
				setError(errorData.message);
			}
		} catch (error) {
			console.error(error);
			setLoading(false);
			setError('Internal server error');
		}
	};

	getAllReviews();

	return { reviews, isLoading, isError };
};
