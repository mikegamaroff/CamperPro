// tripContext.tsx
import { Trip } from '@model/trips';
import React, { ReactNode, createContext, useState } from 'react';

interface TripContextInterface {
	trips: Trip[];
	setTrips: React.Dispatch<React.SetStateAction<Trip[]>>;
}

export const TripContext = createContext<TripContextInterface>({
	trips: [],
	setTrips: () => {}
});

interface TripProviderProps {
	children: ReactNode;
}

export const TripProvider: React.FC<TripProviderProps> = ({ children }) => {
	const [trips, setTrips] = useState<Trip[]>([]);

	return <TripContext.Provider value={{ trips, setTrips }}>{children}</TripContext.Provider>;
};
