import { ReviewContext } from '@context/reviewContext';
import { useContext, useEffect, useState } from 'react';

export const useGetReviewsByCampsite = (campsiteId: string | undefined) => {
	const { reviews, setReviews } = useContext(ReviewContext);
	const [isLoading, setLoading] = useState(false);
	const [isError, setError] = useState<string | null>();

	const getAllReviews = async () => {
		setLoading(true);
		setError(null);

		try {
			const response = await fetch(`/api/reviews?view=view-name&descending=true&campsite=${campsiteId}`, {
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

	useEffect(() => {
		getAllReviews();
	}, [campsiteId]); // only run getAllReviews when campsiteId changes

	return { reviews, isLoading, isError };
};
