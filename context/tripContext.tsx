import { Trip } from '@model/trips';
import React, { ReactNode, createContext, useState } from 'react';

interface TripContextInterface {
	trips: Trip[];
	setTrips: React.Dispatch<React.SetStateAction<Trip[]>>;
	trip: Trip | null;
	setTrip: React.Dispatch<React.SetStateAction<Trip | null>>;
	updateTrip: (updatedTrip: Trip) => void;
}

export const TripContext = createContext<TripContextInterface>({
	trips: [],
	setTrips: () => {},
	trip: null,
	setTrip: () => {},
	updateTrip: () => {}
});

interface TripProviderProps {
	children: ReactNode;
}

export const TripProvider: React.FC<TripProviderProps> = ({ children }) => {
	const [trips, setTrips] = useState<Trip[]>([]);
	const [trip, setTrip] = useState<Trip | null>(null);

	const updateTrip = (updatedTrip: Trip) => {
		setTrip(updatedTrip);
		setTrips(prevTrips => prevTrips.map(t => (t._id === updatedTrip._id ? updatedTrip : t)));
	};

	return (
		<TripContext.Provider value={{ trips, setTrips, trip, setTrip, updateTrip }}>{children}</TripContext.Provider>
	);
};
