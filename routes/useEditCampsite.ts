// hooks/useEditCampsite.ts
import { useState } from 'react';
import { Campsite } from '../model/campsite';

interface EditCampsiteResponse {
	success: boolean;
	message: string;
}

export const useEditCampsite = () => {
	const [isLoading, setLoading] = useState(false);
	const [isError, setError] = useState<string | null>();
	const [isSuccess, setSuccess] = useState(false);

	const editCampsite = async (campsite: Campsite): Promise<EditCampsiteResponse> => {
		setLoading(true);
		setError(null);
		setSuccess(false);

		try {
			const response = await fetch(`/api/campsites/${campsite._id}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json'
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
			setLoading(false);
			setError('Internal server error');
			return { success: false, message: 'Internal server error' };
		}
	};

	return { editCampsite, isLoading, isError, isSuccess };
};

export default useEditCampsite;
