import { TripContext } from '@context/tripContext';
import { Trip } from '@model/trips';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import { useGetCampsite } from './useGetCampsite';

export const useGetTrip = (id: string) => {
	const [isLoading, setLoading] = useState(false);
	const [isError, setError] = useState<string | null>();
	const { trips, setTrips, updateTrip, trip: fetchedTrip } = useContext(TripContext);

	const router = useRouter();

	useEffect(() => {
		const fetchTrip = async () => {
			setLoading(true);
			setError(null);

			try {
				const response = await fetch(`/api/trips/${id}`, {
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${localStorage.getItem('jwtToken')}`
					}
				});

				if (response.ok) {
					const data = await response.json();
					updateTrip(data.trip);
				}
			} catch (error) {
				router.push('/');
				setError('Error fetching trip data');
			} finally {
				setLoading(false);
			}
		};

		fetchTrip();
	}, [id]);

	useEffect(() => {
		if (fetchedTrip) {
			const existingTripIndex = trips.findIndex(trip => trip._id === fetchedTrip._id);
			if (existingTripIndex >= 0) {
				if (JSON.stringify(trips[existingTripIndex]) !== JSON.stringify(fetchedTrip)) {
					// If trip is already in the context and has changed, update it
					setTrips(prevTrips => {
						const updatedTrips = [...prevTrips];
						updatedTrips[existingTripIndex] = fetchedTrip;
						return updatedTrips;
					});
				}
			} else {
				// If trip was not in the context, add it
				setTrips(prevTrips => [...prevTrips, fetchedTrip]);
			}
		}
	}, [fetchedTrip, trips, setTrips]);

	const tripFromState: Trip | undefined = trips.find(trip => trip._id === id);
	const { campsite: campsiteFromHook } = useGetCampsite(tripFromState?.campsite as string);

	if (!tripFromState) {
		return { isLoading, isError: 'Trip not found in state', campsite: null };
	}
	return { trip: tripFromState, campsite: campsiteFromHook, isLoading, isError };
};
