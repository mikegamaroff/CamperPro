import { useState } from 'react';

interface DeleteReviewResponse {
	success: boolean;
	message: string;
}

export const useDeleteReview = () => {
	const [isLoading, setLoading] = useState(false);
	const [isError, setError] = useState<string | null>();
	const [isSuccess, setSuccess] = useState(false);

	const deleteReview = async (id: string): Promise<DeleteReviewResponse> => {
		setLoading(true);
		setError(null);
		setSuccess(false);

		try {
			const response = await fetch(`/api/reviews/${id}`, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${localStorage.getItem('jwtToken')}` // Include the JWT in the Authorization header
				}
			});

			if (response.ok) {
				setLoading(false);
				setSuccess(true);
				return { success: true, message: 'Review deleted successfully' };
			} else {
				const errorData = await response.json();
				setLoading(false);
				setError(errorData.message);
				return { success: false, message: errorData.message };
			}
		} catch (error) {
			setLoading(false);
			setError('Internal server error');
			return { success: false, message: 'Internal server error' };
		}
	};

	return { deleteReview, isLoading, isError, isSuccess };
};

export default useDeleteReview;
