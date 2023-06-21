import { AmenityNames, Attributes, FeatureNames, FilterIDType, PermittedNames } from '../model/campsite';

export const selectAttributeFilter = (
	selectedFilter: Attributes | undefined,
	id: FilterIDType
): Attributes | undefined => {
	// Create a deep copy of the current filters
	const newFilters: Attributes = JSON.parse(JSON.stringify(selectedFilter || {}));
	// Get the key and value from the id
	const [filterKey, filterValue] = Object.entries(id)[0] as [
		keyof Attributes,
		FeatureNames | AmenityNames | PermittedNames
	];
	// If filterKey array doesn't exist, initialize it
	if (!newFilters[filterKey]) {
		newFilters[filterKey] = [];
	}
	// Find the index of the filterValue in the filterKey array
	const index = (newFilters[filterKey] as Array<FeatureNames | AmenityNames | PermittedNames>).indexOf(filterValue);
	if (index > -1) {
		// If filterValue exists in the array, remove it
		(newFilters[filterKey] as Array<FeatureNames | AmenityNames | PermittedNames>).splice(index, 1);
	} else {
		// If filterValue doesn't exist in the array, add it
		(newFilters[filterKey] as Array<FeatureNames | AmenityNames | PermittedNames>).push(filterValue);
	}

	// Check if all arrays in newFilters are empty or not existent
	const allEmpty = Object.values(newFilters).every(arr => arr === undefined || arr.length === 0);
	if (allEmpty) {
		return undefined;
	} else {
		return newFilters;
	}
};
