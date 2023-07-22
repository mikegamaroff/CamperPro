import { v4 as uuidv4 } from 'uuid';
import { addDays, getLocalDay } from './date';
import { Document } from './model';
export interface Trip extends Document {
	_id: string;
	checkin: string;
	checkout: string;
	camper: string;
	capacity: {
		adults: number;
		children: number;
		pets: number;
	};
	campsite: string;
}
export const EmptyNewTrip: Trip = {
	_id: `trip:${uuidv4()}`,
	type: 'trip',
	created_at: new Date().toISOString(),
	updated_at: new Date().toISOString(),
	checkin: new Date().toISOString(),
	checkout: addDays(getLocalDay(), 3),
	camper: '',
	campsite: '',
	capacity: {
		adults: 0,
		children: 0,
		pets: 0
	}
};

export const EmptyTrip: Trip = EmptyNewTrip;
