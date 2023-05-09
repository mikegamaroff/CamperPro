// hooks/useGetCampsite.ts
import { useEffect, useState } from 'react';
import { Campsite } from '../model/campsite';

export const useGetCampsite = (id: string) => {
	const [campsite, setCampsite] = useState<Campsite | undefined>();
	const [isLoading, setLoading] = useState(false);
	const [isError, setError] = useState<string | null>();

	useEffect(() => {
		const fetchCampsite = async () => {
			setLoading(true);
			setError(null);

			try {
				const response = await fetch(`/api/campsites/${id}`);
				if (response.ok) {
					const data = await response.json();
					setCampsite(data.campsite);
				} else {
					setError('Error fetching campsite data');
				}
			} catch (error) {
				setError('Error fetching campsite data');
			} finally {
				setLoading(false);
			}
		};

		fetchCampsite();
	}, [id]);

	return { campsite, isLoading, isError };
};

export default useGetCampsite;
