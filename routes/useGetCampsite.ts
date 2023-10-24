import { CampsiteContext } from '@context/campsiteContext';
import { Campsite } from '@model/campsite';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';

export const useGetCampsite = (id: string) => {
	const [isLoading, setLoading] = useState(false);
	const [isError, setError] = useState<string | null>();
	const [fetchedCampsite, setFetchedCampsite] = useState<Campsite | null>(null);
	const { campsites, setCampsites } = useContext(CampsiteContext);

	const router = useRouter();

	useEffect(() => {
		const fetchCampsite = async () => {
			setLoading(true);
			setError(null);

			try {
				const response = await fetch(`/api/campsites/${id}`, {
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${localStorage.getItem('jwtToken')}`
					}
				});

				if (response.ok) {
					const data = await response.json();
					setFetchedCampsite(data.campsite);
				}
			} catch (error) {
				router.push('/');
				setError('Error fetching campsite data');
			} finally {
				setLoading(false);
			}
		};

		fetchCampsite();
	}, [id, router]);

	useEffect(() => {
		if (fetchedCampsite) {
			const existingCampsiteIndex = campsites.findIndex(camp => camp._id === fetchedCampsite._id);
			if (existingCampsiteIndex >= 0) {
				if (JSON.stringify(campsites[existingCampsiteIndex]) !== JSON.stringify(fetchedCampsite)) {
					// If campsite is already in the context and has changed, update it
					setCampsites(prevCampsites => {
						const updatedCampsites = [...prevCampsites];
						updatedCampsites[existingCampsiteIndex] = fetchedCampsite;
						return updatedCampsites;
					});
				}
			} else {
				// If campsite was not in the context, add it
				setCampsites(prevCampsites => [...prevCampsites, fetchedCampsite]);
			}
		}
	}, [fetchedCampsite, campsites, setCampsites]);

	const campsiteFromState: Campsite | undefined = campsites.find(camp => camp._id === id);
	if (!campsiteFromState) {
		return { isLoading, isError: 'Campsite not found in state' };
	}
	return { campsite: campsiteFromState, isLoading, isError };
};
