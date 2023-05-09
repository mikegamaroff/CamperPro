import { v4 as uuidv4 } from 'uuid';
import { DocumentWithImages } from './model';
export interface User extends DocumentWithImages {
	_id?: string;
	type: string;
	username: string;
	first_name: string;
	last_name: string;
	email: string;
	password: string;
	phone_number: string;
	created_at?: string;
	updated_at?: string;
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
	password: '',
	phone_number: '',
	created_at: new Date().toISOString(),
	updated_at: new Date().toISOString(),
	verified: true,
	suspended: false
};
export const EmptyUser: User = EmptyNewUser;
