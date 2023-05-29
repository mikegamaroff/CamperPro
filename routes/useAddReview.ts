// hooks/useAddReview.ts
import { useState } from 'react';
import { Review } from '../model/review';

interface AddReviewResponse {
	success: boolean;
	message: string;
}

export const useAddReview = () => {
	const [isLoading, setLoading] = useState(false);
	const [isError, setError] = useState<string | null>();
	const [isSuccess, setSuccess] = useState(false);
	const addReview = async (review: Review): Promise<AddReviewResponse> => {
		setLoading(true);
		setError(null);
		setSuccess(false);
		try {
			const response = await fetch('/api/reviews', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${localStorage.getItem('jwtToken')}` // Include the JWT in the Authorization header
				},
				body: JSON.stringify(review)
			});

			if (response.ok) {
				const data = await response.json();
				setLoading(false);
				setSuccess(true);
				return { success: true, message: data.message };
			} else {
				const errorData = await response.json();
				setLoading(false);
				setError(errorData.message);
				return { success: false, message: errorData.message };
			}
		} catch (error) {
			console.error(error);
			setLoading(false);
			setError('Internal server error');
			return { success: false, message: 'Internal server error' };
		}
	};

	return { addReview, isLoading, isError, isSuccess };
};
