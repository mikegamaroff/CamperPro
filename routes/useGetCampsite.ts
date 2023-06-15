import { CampsiteContext } from '@context/campsiteContext';
import { Campsite } from '@model/campsite';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';

export const useGetCampsite = (id: string) => {
	const [isLoading, setLoading] = useState(false);
	const [isError, setError] = useState<string | null>();
	const { campsites, setCampsites } = useContext(CampsiteContext);

	// Get the router object
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
						Authorization: `Bearer ${localStorage.getItem('jwtToken')}` // Include the JWT in the Authorization header
					}
				});

				if (response.ok) {
					const data = await response.json();
					const existingCampsiteIndex = campsites.findIndex(camp => camp._id === data.campsite._id);

					if (existingCampsiteIndex >= 0) {
						// If campsite is already in the context, update it
						setCampsites(prevCampsites => {
							const updatedCampsites = [...prevCampsites];
							updatedCampsites[existingCampsiteIndex] = data.campsite;
							return updatedCampsites;
						});
					} else {
						// If campsite was not in the context, add it
						setCampsites(prevCampsites => [...prevCampsites, data.campsite]);
					}
				}
			} catch (error) {
				// Error fetching campsite data, navigate to '/'
				router.push('/');
				setError('Error fetching campsite data');
			} finally {
				setLoading(false);
			}
		};

		fetchCampsite();
	}, [id, campsites]);

	const campsiteFromState: Campsite | undefined = campsites.find(camp => camp._id === id);
	if (!campsiteFromState) {
		return { isLoading, isError: 'Campsite not found in state' };
	}
	return { campsite: campsiteFromState, isLoading, isError };
};
