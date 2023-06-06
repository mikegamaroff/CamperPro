import { v4 as uuidv4 } from 'uuid';
import { DocumentWithImages } from './model';
export interface User extends DocumentWithImages {
	username: string;
	first_name: string;
	last_name: string;
	email: string;
	password: string;
	phone_number: string;
	verified: boolean;
	suspended: boolean;
}
export const EmptyNewUser: User = {
	_id: `user:${uuidv4()}`,
	type: 'user',
	username: '',
	first_name: '',
	last_name: '',
	email: '',
	images: [],
	password: '',
	phone_number: '',
	created_at: new Date().toISOString(),
	updated_at: new Date().toISOString(),
	verified: true,
	suspended: false
};
export type ModeType = 'Camper' | 'Host';

export const EmptyUser: User = EmptyNewUser;
