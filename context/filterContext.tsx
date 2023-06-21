// FilterContext.tsx
import { Attributes, CampsiteFilter, FilterIDType } from '@model/campsite';
import { selectAttributeFilter } from '@utils/selectAttributeFilter';
import React, { ReactNode, createContext, useEffect, useState } from 'react';

interface FilterContextInterface {
	selectedFilter: CampsiteFilter;
	setSelectedFilter: React.Dispatch<React.SetStateAction<CampsiteFilter>>;
	selectedAttributes: Attributes | undefined;
	handleSelectAttributes: (id: FilterIDType) => void;
}

export const FilterContext = createContext<FilterContextInterface>({
	selectedFilter: {},
	setSelectedFilter: () => {},
	selectedAttributes: {},
	handleSelectAttributes: () => {}
});

interface FilterProviderProps {
	children: ReactNode;
}

export const FilterProvider: React.FC<FilterProviderProps> = ({ children }) => {
	const [selectedFilter, setSelectedFilter] = useState<CampsiteFilter>({});
	const [selectedAttributes, setUpdatedAttributes] = useState<Attributes>();

	const handleSelectAttributes = (id: FilterIDType) => {
		console.log(id);
		const updatedAttributes: Attributes | undefined = selectAttributeFilter(selectedAttributes, id);
		setUpdatedAttributes(updatedAttributes);
	};

	useEffect(() => {
		setSelectedFilter(prevFilter => ({ ...prevFilter, attributes: selectedAttributes }));
	}, [selectedAttributes]);

	return (
		<FilterContext.Provider
			value={{ selectedFilter, setSelectedFilter, selectedAttributes, handleSelectAttributes }}
		>
			{children}
		</FilterContext.Provider>
	);
};
