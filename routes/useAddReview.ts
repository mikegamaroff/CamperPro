// hooks/useAddReview.ts
import { CampsiteContext } from '@context/campsiteContext';
import { Campsite } from '@model/campsite';
import { Review } from '@model/review';
import { useContext, useState } from 'react';

interface AddReviewResponse {
	success: boolean;
	message: string;
}

export const useAddReview = () => {
	const { setCampsite } = useContext(CampsiteContext);
	const [isLoading, setLoading] = useState(false);
	const [isError, setError] = useState<string | null>();
	const [isSuccess, setSuccess] = useState(false);

	const addReview = async (review: Review): Promise<{ response: AddReviewResponse; campsite: Campsite | null }> => {
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
				return { response: { success: true, message: data.message }, campsite: data.campsite };
			} else {
				const errorData = await response.json();
				setLoading(false);
				setError(errorData.message);
				return { response: { success: false, message: errorData.message }, campsite: null };
			}
		} catch (error) {
			console.error(error);
			setLoading(false);
			setError('Internal server error');
			return { response: { success: false, message: 'Internal Server Error' }, campsite: null };
		}
	};

	return { addReview, isLoading, isError, isSuccess };
};
