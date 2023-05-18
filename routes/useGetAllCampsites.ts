// hooks/useGetAllCampsites.ts
import { useContext, useEffect, useState } from 'react';
import { CampsiteContext } from '../context/campsiteContext';
import { AttributeFilters, defaultFilter } from '../model/campsite';

interface GetAllCampsiteProps {
	view?: string;
	filters?: AttributeFilters;
}
export const useGetAllCampsites = ({
	view = 'non-draft-campsites',
	filters = defaultFilter
}: GetAllCampsiteProps = {}) => {
	const { campsites, setCampsites } = useContext(CampsiteContext);
	const [isLoading, setLoading] = useState(false);
	const [isError, setError] = useState<string | null>();

	const getAllCampsites = async () => {
		setLoading(true);
		setError(null);

		try {
			const response = await fetch(`/api/campsites?view=${view}&filters=${JSON.stringify(filters)}`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${localStorage.getItem('jwtToken')}`
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
