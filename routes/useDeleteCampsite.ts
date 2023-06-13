import { CampsiteContext } from '@context/campsiteContext';
import { useContext, useState } from 'react';

interface DeleteCampsiteResponse {
	success: boolean;
	message: string;
}

export const useDeleteCampsite = () => {
	const [isLoading, setLoading] = useState(false);
	const [isError, setError] = useState<string | null>();
	const [isSuccess, setSuccess] = useState(false);
	const { campsites, setCampsites, myCampsites, setMyCampsites } = useContext(CampsiteContext); // access context
	const deleteCampsite = async (id: string): Promise<DeleteCampsiteResponse> => {
		setLoading(true);
		setError(null);
		setSuccess(false);

		try {
			const response = await fetch(`/api/campsites/${id}`, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${localStorage.getItem('jwtToken')}` // Include the JWT in the Authorization header
				}
			});

			if (response.ok) {
				setLoading(false);
				setSuccess(true);
				const updatedCampsites = campsites.filter(campsite => campsite._id !== id);
				const updatedMyCampsites = myCampsites.filter(campsite => campsite._id !== id);
				console.log(updatedCampsites);
				setCampsites(updatedCampsites);
				setMyCampsites(updatedMyCampsites);
				return { success: true, message: 'Campsite deleted successfully' };
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

	return { deleteCampsite, isLoading, isError, isSuccess };
};

export default useDeleteCampsite;
