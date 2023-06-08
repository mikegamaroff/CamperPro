import { CampsiteFilter } from '@model/campsite';

export function buildMangoQuery(filters: CampsiteFilter) {
	// Check if filters object is empty
	if (!filters) {
		// If it's null or undefined, return a query that matches all documents
		return { selector: { active: true, draft: false } };
	}

	const query: any = {
		selector: {
			active: true,
			draft: false
		}
	};

	if (filters.private !== undefined) {
		query.selector.private = filters.private;
	}

	if (filters.rating !== undefined) {
		query.selector.rating = {
			$gte: filters.rating[0],
			$lte: filters.rating[1]
		};
	}

	if (filters.location !== undefined) {
		query.selector['location.state'] = filters.location.state;
		query.selector['location.nearestTown'] = filters.location.nearestTown;
	}

	if (filters.priceRange !== undefined) {
		query.selector.pricePerNight = {
			$gte: filters.priceRange[0],
			$lte: filters.priceRange[1]
		};
	}

	if (filters.attributes !== undefined) {
		const attributes = filters.attributes as { [key: string]: string[] };

		for (const key in attributes) {
			query.selector[`attributes.${key}`] = {
				$all: attributes[key]
			};
		}
	}

	if (filters.numberOfTentSites !== undefined) {
		query.selector['capacity.numberOfTentSites'] = filters.numberOfTentSites;
	}

	if (filters.acreage !== undefined) {
		query.selector['capacity.acreage'] = filters.acreage;
	}

	return query;
}
