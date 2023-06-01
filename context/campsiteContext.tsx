// campsiteContext.tsx
import React, { ReactNode, createContext, useState } from 'react';
import { Campsite } from '../model/campsite';

interface CampsiteContextInterface {
	campsites: Campsite[];
	setCampsites: React.Dispatch<React.SetStateAction<Campsite[]>>;
	campsite: Campsite | null;
	setCampsite: React.Dispatch<React.SetStateAction<Campsite | null>>;
	updateCampsite: (updatedCampsite: Campsite) => void;
}

export const CampsiteContext = createContext<CampsiteContextInterface>({
	campsites: [],
	setCampsites: () => {},
	campsite: null,
	setCampsite: () => {},
	updateCampsite: () => {}
});

interface CampsiteProviderProps {
	children: ReactNode;
}

export const CampsiteProvider: React.FC<CampsiteProviderProps> = ({ children }) => {
	const [campsites, setCampsites] = useState<Campsite[]>([]);
	const [campsite, setCampsite] = useState<Campsite | null>(null);

	const updateCampsite = (updatedCampsite: Campsite) => {
		setCampsite(updatedCampsite);
		setCampsites(campsites.map(camp => (camp._id === updatedCampsite._id ? updatedCampsite : camp)));
	};

	return (
		<CampsiteContext.Provider value={{ campsites, setCampsites, campsite, setCampsite, updateCampsite }}>
			{children}
		</CampsiteContext.Provider>
	);
};
