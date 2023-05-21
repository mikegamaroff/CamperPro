// Import useRouter from next/router
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Campsite } from '../model/campsite';

export const useGetCampsite = (id: string) => {
	const [campsite, setCampsite] = useState<Campsite>();
	const [isLoading, setLoading] = useState(false);
	const [isError, setError] = useState<string | null>();

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
					setCampsite(data.campsite);
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
	}, [id, router]); // Include router in the dependency array

	return { campsite, isLoading, isError };
};

export default useGetCampsite;
