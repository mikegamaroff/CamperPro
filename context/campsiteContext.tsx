// campsiteContext.tsx
import React, { ReactNode, createContext, useState } from 'react';
import { Campsite } from '../model/campsite';

interface CampsiteContextInterface {
	campsites: Campsite[];
	setCampsites: React.Dispatch<React.SetStateAction<Campsite[]>>;
}

export const CampsiteContext = createContext<CampsiteContextInterface>({
	campsites: [],
	setCampsites: () => {}
});

interface CampsiteProviderProps {
	children: ReactNode;
}

export const CampsiteProvider: React.FC<CampsiteProviderProps> = ({ children }) => {
	const [campsites, setCampsites] = useState<Campsite[]>([]);

	return <CampsiteContext.Provider value={{ campsites, setCampsites }}>{children}</CampsiteContext.Provider>;
};
