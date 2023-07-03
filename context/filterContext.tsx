// FilterContext.tsx
import { Attributes, CampsiteFilter, FilterIDType } from '@model/campsite';
import { selectAttributeFilter } from '@utils/selectAttributeFilter';
import React, { ReactNode, createContext, useEffect, useState } from 'react';

interface FilterContextInterface {
	selectedFilter: CampsiteFilter;
	setSelectedFilter: (filters: CampsiteFilter) => void;
	selectedAttributes: Attributes | undefined;
	handleSelectAttributes: (id: FilterIDType) => void;
	clearFilters: () => void;
	filters: boolean;
}

export const FilterContext = createContext<FilterContextInterface>({
	selectedFilter: {},
	setSelectedFilter: () => {},
	selectedAttributes: {},
	handleSelectAttributes: () => {},
	clearFilters: () => {},
	filters: false
});

interface FilterProviderProps {
	children: ReactNode;
}

export const FilterProvider: React.FC<FilterProviderProps> = ({ children }) => {
	const [selectedFilter, setFilters] = useState<CampsiteFilter>({});
	const [filters, setAllFilters] = useState<boolean>(false);
	const [genericFilters, setGenericFilters] = useState<boolean>(false);
	const [selectedAttributes, setUpdatedAttributes] = useState<Attributes>();

	const handleSelectAttributes = (id: FilterIDType) => {
		const updatedAttributes: Attributes | undefined = selectAttributeFilter(selectedAttributes, id);
		const areAttributes = Boolean(updatedAttributes);
		if (areAttributes) {
			setAllFilters(true);
		} else {
			!genericFilters && setAllFilters(false);
		}
		setUpdatedAttributes(updatedAttributes);
	};
	const setSelectedFilter = (filters: CampsiteFilter) => {
		setFilters(filters);
		setGenericFilters(true);
		setAllFilters(true);
	};
	const clearFilters = () => {
		setSelectedFilter({});
		setUpdatedAttributes({});
		setAllFilters(false);
		setGenericFilters(false);
	};
	useEffect(() => {
		setFilters(prevFilter => ({ ...prevFilter, attributes: selectedAttributes }));
	}, [selectedAttributes]);

	return (
		<FilterContext.Provider
			value={{
				selectedFilter,
				setSelectedFilter,
				selectedAttributes,
				handleSelectAttributes,
				clearFilters,
				filters
			}}
		>
			{children}
		</FilterContext.Provider>
	);
};
