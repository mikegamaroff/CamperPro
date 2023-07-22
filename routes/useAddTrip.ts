// hooks/useAddTrip.ts
import { Campsite } from '@model/campsite';
import { Trip } from '@model/trips';
import { useState } from 'react';

interface AddTripResponse {
	success: boolean;
	message: string;
}

export const useAddTrip = () => {
	const [isLoading, setLoading] = useState(false);
	const [isError, setError] = useState<string | null>();
	const [isSuccess, setSuccess] = useState(false);

	const addTrip = async (trip: Trip): Promise<{ response: AddTripResponse; campsite: Campsite | null }> => {
		setLoading(true);
		setError(null);
		setSuccess(false);
		try {
			const response = await fetch('/api/trips', {
				method: 'POST',
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

	return { addTrip, isLoading, isError, isSuccess };
};
