// campsiteContext.tsx
import React, { ReactNode, createContext, useState } from 'react';
import { Campsite } from '../model/campsite';

interface CampsiteContextInterface {
	campsites: Campsite[];
	setCampsites: React.Dispatch<React.SetStateAction<Campsite[]>>;
	updateImage: (data: Campsite) => void;
}

export const CampsiteContext = createContext<CampsiteContextInterface>({
	campsites: [],
	setCampsites: () => {},
	updateImage: () => {}
});

interface CampsiteProviderProps {
	children: ReactNode;
}

export const CampsiteProvider: React.FC<CampsiteProviderProps> = ({ children }) => {
	const [campsites, setCampsites] = useState<Campsite[]>([]);
	const updateImage = (data: Campsite) => {
		if (data) {
			setCampsites(campsites.map(campsite => (campsite._id === data._id ? data : campsite)));
		}
	};
	return (
		<CampsiteContext.Provider value={{ campsites, setCampsites, updateImage }}>{children}</CampsiteContext.Provider>
	);
};
