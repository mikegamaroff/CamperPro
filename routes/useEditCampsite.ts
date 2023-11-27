// hooks/useEditCampsite.ts
import { CampsiteContext } from '@context/campsiteContext';
import { Campsite } from '@model/campsite';
import { useContext, useState } from 'react';

interface EditCampsiteResponse {
	success: boolean;
	message: string;
}

export const useEditCampsite = () => {
	const [isLoading, setLoading] = useState(false);
	const [isError, setError] = useState<string | null>();
	const [isSuccess, setSuccess] = useState(false);

	const { setCampsite } = useContext(CampsiteContext);

	const editCampsite = async (campsite: Campsite): Promise<EditCampsiteResponse> => {
		setLoading(true);
		setError(null);
		setSuccess(false);

		try {
			const response = await fetch(`/api/campsites/${campsite._id}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${localStorage.getItem('jwtToken')}`
				},
				body: JSON.stringify(campsite)
			});

			if (response.ok) {
				const data = await response.json();
				setCampsite(campsite); // Update the context with the edited campsite
				setSuccess(true);
				setLoading(false);
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
