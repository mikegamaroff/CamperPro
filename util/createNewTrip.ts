import { EmptyNewTrip, Trip } from '@model/trips';
import { User } from '@model/user';
import { v4 as uuidv4 } from 'uuid';

export function createNewTrip(user?: User): Trip {
	const newId = uuidv4();
	const newTrip: Trip = {
		...EmptyNewTrip,
		_id: 'trip:' + newId,
		camper: user?._id as string
	};

	return newTrip;
}
