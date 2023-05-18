// hooks/useEditCampsite.ts
import { useContext, useState } from 'react';
import { CampsiteContext } from '../context/campsiteContext';
import { Campsite } from '../model/campsite';

interface EditCampsiteResponse {
	success: boolean;
	message: string;
}

export const useEditCampsite = () => {
	const [isLoading, setLoading] = useState(false);
	const [isError, setError] = useState<string | null>();
	const [isSuccess, setSuccess] = useState(false);

	const { campsites, setCampsites } = useContext(CampsiteContext); // access context
	console.log(campsites);
	const editCampsite = async (campsite: Campsite): Promise<EditCampsiteResponse> => {
		setLoading(true);
		setError(null);
		setSuccess(false);

		try {
			const response = await fetch(`/api/campsites/${campsite._id}`, {
				method: 'PUT',
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
				console.log(data);
				// Check if the campsite is not a draft
				const campsiteExists = campsites.some(c => c._id === campsite._id);
				if (campsiteExists) {
					// If it is not a draft, update it
					setCampsites(campsites.map(c => (c._id === campsite._id ? campsite : c)));
				} else {
					// If it is a draft, you won't see it and will need to be added to the context
					setCampsites([...campsites, campsite]);
				}
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
