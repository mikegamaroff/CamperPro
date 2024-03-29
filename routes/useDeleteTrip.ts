// hooks/useDeleteTrip.ts
import { useState } from 'react';

interface DeleteTripResponse {
	success: boolean;
	message: string;
}

export const useDeleteTrip = () => {
	const [isLoading, setLoading] = useState(false);
	const [isError, setError] = useState<string | null>(null);
	const [isSuccess, setSuccess] = useState(false);

	const deleteTrip = async (tripId: string): Promise<DeleteTripResponse> => {
		setLoading(true);
		setError(null);
		setSuccess(false);

		try {
			const response = await fetch(`/api/trips/${tripId}`, {
				method: 'DELETE',
				headers: {
					Authorization: `Bearer ${localStorage.getItem('jwtToken')}`
				}
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
			return { success: false, message: 'Internal Server Error' };
		}
	};

	return { deleteTrip, isLoading, isError, isSuccess };
};
