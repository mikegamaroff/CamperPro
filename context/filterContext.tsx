// FilterContext.tsx
import { Attributes, CampsiteFilter, FilterIDType } from '@model/campsite';
import { selectAttributeFilter } from '@utils/selectAttributeFilter';
import React, { ReactNode, createContext, useState } from 'react';

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
	const [filters, setClearedFilters] = useState<boolean>(false);
	const [selectedAttributes, setUpdatedAttributes] = useState<Attributes>();

	const handleSelectAttributes = (id: FilterIDType) => {
		const updatedAttributes: Attributes | undefined = selectAttributeFilter(selectedAttributes, id);
		setUpdatedAttributes(updatedAttributes);
		setSelectedFilter({ ...selectedFilter, attributes: selectedAttributes });
		setClearedFilters(true);
	};
	const setSelectedFilter = (filters: CampsiteFilter) => {
		setFilters(filters);
		setClearedFilters(true);
	};
	const clearFilters = () => {
		setSelectedFilter({});
		setUpdatedAttributes({});
		setClearedFilters(false);
	};

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
