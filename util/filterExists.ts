import { FilterContext } from '@context/filterContext';
import { Attributes, FilterIDType } from '@model/campsite';
import { useContext } from 'react';

export const filterExists = (id: FilterIDType): boolean => {
	const { selectedAttributes } = useContext(FilterContext);

	if (!selectedAttributes) return false;

	for (const filterKey in id) {
		const filterValue = id[filterKey as keyof FilterIDType];
		const selectedFilterValues = selectedAttributes[filterKey as keyof Attributes];

		if (filterValue && selectedFilterValues && (selectedFilterValues as string[]).includes(filterValue)) {
			return true;
		}
	}

	return false;
};
