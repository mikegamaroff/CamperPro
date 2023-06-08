// hooks/useGetAllCampsites.ts
import { CampsiteContext } from '@context/campsiteContext';
import { CampsiteFilter } from '@model/campsite';
import { useContext, useEffect, useState } from 'react';

interface GetAllCampsiteProps {
	view?: string;
	filters?: CampsiteFilter | null;
}
export const useGetAllCampsites = ({ view = 'non-draft-campsites', filters }: GetAllCampsiteProps = {}) => {
	const { campsites, setCampsites } = useContext(CampsiteContext);
	const [isLoading, setLoading] = useState(false);
	const [isError, setError] = useState<string | null>();
	const getAllCampsites = async () => {
		setLoading(true);
		setError(null);

		try {
			const response = await fetch(
				`/api/campsites?view=${view}&filters=${encodeURIComponent(JSON.stringify(filters))}`,
				{
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${localStorage.getItem('jwtToken')}`
					}
				}
			);

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
	}, [filters]); // Update whenever filters changes

	return { campsites, isLoading, isError };
};
