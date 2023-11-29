import { CampsiteContext } from '@context/campsiteContext';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';

export const useGetCampsite = (id: string) => {
	const [isLoading, setLoading] = useState(false);
	const [isError, setError] = useState<string | null>(null);
	const { campsite, setCampsite } = useContext(CampsiteContext);

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
					setCampsite(data.campsite);
				} else {
					setError('Failed to fetch campsite data');
				}
			} catch (error) {
				setError('Error fetching campsite data');
				router.push('/error'); // Redirect to an error page or handle it differently
			} finally {
				setLoading(false);
			}
		};

		if (!campsite || campsite._id !== id) {
			fetchCampsite();
		}
	}, [id, campsite, setCampsite, router]);

	return { campsite, isLoading, isError };
};
