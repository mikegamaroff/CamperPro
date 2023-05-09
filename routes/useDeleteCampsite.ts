import { useState } from 'react';

interface DeleteCampsiteResponse {
	success: boolean;
	message: string;
}

export const useDeleteCampsite = () => {
	const [isLoading, setLoading] = useState(false);
	const [isError, setError] = useState<string | null>();
	const [isSuccess, setSuccess] = useState(false);

	const deleteCampsite = async (id: string): Promise<DeleteCampsiteResponse> => {
		setLoading(true);
		setError(null);
		setSuccess(false);

		try {
			const response = await fetch(`/api/campsites/${id}`, {
				method: 'DELETE'
			});

			if (response.ok) {
				setLoading(false);
				setSuccess(true);
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
