// campsiteContext.tsx
import React, { ReactNode, createContext, useState } from 'react';
import { Campsite } from '../model/campsite';

interface CampsiteContextInterface {
	campsites: Campsite[];
	myCampsites: Campsite[];
	setCampsites: React.Dispatch<React.SetStateAction<Campsite[]>>;
	setMyCampsites: React.Dispatch<React.SetStateAction<Campsite[]>>;
	campsite: Campsite | null;
	setCampsite: React.Dispatch<React.SetStateAction<Campsite | null>>;
	updateCampsite: (updatedCampsite: Campsite) => void;
}

export const CampsiteContext = createContext<CampsiteContextInterface>({
	campsites: [],
	myCampsites: [],
	setCampsites: () => {},
	setMyCampsites: () => {},
	campsite: null,
	setCampsite: () => {},
	updateCampsite: () => {}
});

interface CampsiteProviderProps {
	children: ReactNode;
}

export const CampsiteProvider: React.FC<CampsiteProviderProps> = ({ children }) => {
	const [campsites, setCampsites] = useState<Campsite[]>([]);
	const [myCampsites, setMyCampsites] = useState<Campsite[]>([]);
	const [campsite, setCampsite] = useState<Campsite | null>(null);

	const updateCampsite = (updatedCampsite: Campsite) => {
		setCampsite(updatedCampsite);
		setCampsites(campsites.map(camp => (camp._id === updatedCampsite._id ? updatedCampsite : camp)));
	};

	return (
		<CampsiteContext.Provider
			value={{ campsites, myCampsites, setCampsites, setMyCampsites, campsite, setCampsite, updateCampsite }}
		>
			{children}
		</CampsiteContext.Provider>
	);
};
