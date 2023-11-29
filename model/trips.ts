import { v4 as uuidv4 } from 'uuid';
import { addDays, getLocalDay } from './date';
import { DocumentWithImages } from './model';
export interface Trip extends DocumentWithImages {
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
	message: string;
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
	message: '',
	images: [],
	capacity: {
		adults: 0,
		children: 0,
		pets: 0
	}
};

export const EmptyTrip: Trip = EmptyNewTrip;
