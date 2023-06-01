import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import { CampsiteContext } from '../context/campsiteContext';

export const useGetCampsite = (id: string) => {
	const [isLoading, setLoading] = useState(false);
	const [isError, setError] = useState<string | null>();
	const { campsites, setCampsites } = useContext(CampsiteContext);
	const campsite = campsites.find(camp => camp._id === id);

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
					if (!campsite) {
						// If campsite was not in the context, add it
						setCampsites(prevCampsites => [...prevCampsites, data.campsite]);
					}
				} else {
					// Error fetching campsite data, navigate to '/'
					router.push('/');
					setError('Error fetching campsite data');
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
	}, [id, router, setCampsites]); // Remove 'campsite' from the dependency array

	// Return campsite from context instead of state
	return { campsite: campsites.find(camp => camp._id === id), isLoading, isError };
};
