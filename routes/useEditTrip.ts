// hooks/useUpdateTrip.ts
import { Trip } from '@model/trips';
import { useState } from 'react';

interface UpdateTripResponse {
	success: boolean;
	message: string;
}

export const useEditTrip = () => {
	const [isLoading, setLoading] = useState(false);
	const [isError, setError] = useState<string | null>();
	const [isSuccess, setSuccess] = useState(false);

	const updateTrip = async (trip: Trip): Promise<UpdateTripResponse> => {
		setLoading(true);
		setError(null);
		setSuccess(false);
		try {
			const response = await fetch(`/api/trip/${trip._id}`, {
				// Assuming your API route is structured this way
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${localStorage.getItem('jwtToken')}` // Include the JWT in the Authorization header
				},
				body: JSON.stringify(trip)
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

	return { updateTrip, isLoading, isError, isSuccess };
};
