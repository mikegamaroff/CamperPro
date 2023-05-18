// hooks/useAddCampsite.ts
import { useState } from 'react';
import { Campsite } from '../model/campsite';

interface AddCampsiteResponse {
	success: boolean;
	message: string;
}

export const useAddCampsite = () => {
	const [isLoading, setLoading] = useState(false);
	const [isError, setError] = useState<string | null>();
	const [isSuccess, setSuccess] = useState(false);
	const addCampsite = async (campsite: Campsite): Promise<AddCampsiteResponse> => {
		setLoading(true);
		setError(null);
		setSuccess(false);
		try {
			const response = await fetch('/api/campsites', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${localStorage.getItem('jwtToken')}` // Include the JWT in the Authorization header
				},
				body: JSON.stringify(campsite)
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

	return { addCampsite, isLoading, isError, isSuccess };
};
