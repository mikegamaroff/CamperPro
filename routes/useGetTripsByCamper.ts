// hooks/useGetTripsByCamper.ts
import { TripContext } from '@context/tripContext';
import { useContext, useEffect, useState } from 'react';

export const useGetTripsByCamper = (camperId: string | undefined) => {
	const { trips, setTrips } = useContext(TripContext);
	const [isLoading, setLoading] = useState(false);
	const [isError, setError] = useState<string | null>();

	const getAllTrips = async () => {
		setLoading(true);
		setError(null);

		try {
			const response = await fetch(`/api/trips?camper=${camperId}`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${localStorage.getItem('jwtToken')}`
				}
			});

			if (response.ok) {
				const data = await response.json();
				setTrips(data.trips);
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
		if (camperId) {
			getAllTrips();
		}
	}, [camperId]); // only run getAllTrips when camperId changes

	return { trips, isLoading, isError };
};
