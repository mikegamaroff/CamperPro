// hooks/useGetAllCampsites.ts
import { useContext, useEffect, useState } from 'react';
import { CampsiteContext } from '../context/campsiteContext';

export const useGetAllCampsites = () => {
	const { campsites, setCampsites } = useContext(CampsiteContext);
	const [isLoading, setLoading] = useState(false);
	const [isError, setError] = useState<string | null>();

	const getAllCampsites = async () => {
		setLoading(true);
		setError(null);

		try {
			const response = await fetch('/api/campsites', {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json'
				}
			});

			if (response.ok) {
				const data = await response.json();
				setCampsites(data.campsites);
				setLoading(false);
			} else {
				const errorData = await response.json();
				setLoading(false);
				setError(errorData.message);
			}
		} catch (error) {
			console.error(error);
			setLoading(false);
			setError('Internal server error');
		}
	};

	useEffect(() => {
		getAllCampsites();
	}, []); // Only run once when the hook is used

	return { campsites, isLoading, isError };
};
