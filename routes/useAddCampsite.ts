// hooks/useAddCampsite.ts
import { useContext, useState } from 'react';
import { CampsiteContext } from '../context/campsiteContext';
import { Campsite } from '../model/campsite';

interface AddCampsiteResponse {
	success: boolean;
	message: string;
}

export const useAddCampsite = () => {
	const { campsites, setCampsites } = useContext(CampsiteContext);
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
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(campsite)
			});

			if (response.ok) {
				const data = await response.json();
				setCampsites([...campsites, data.campsite]);

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

	return { campsites, addCampsite, isLoading, isError, isSuccess };
};
