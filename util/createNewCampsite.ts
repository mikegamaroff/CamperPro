// utils/addCampsite.ts

import { Campsite, EmptyNewCampsite } from '@model/campsite';
import { User } from '@model/user';
import { v4 as uuidv4 } from 'uuid';

export function createNewCampsite(user?: User): Campsite {
	const newId = uuidv4();
	const newCampsite: Campsite = {
		...EmptyNewCampsite,
		_id: 'campsite:' + newId,
		title: 'Draft Campsite',
		author: user?._id as string
		// Add other campsite properties
	};

	return newCampsite;
}
