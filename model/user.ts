import { v4 as uuidv4 } from 'uuid';
import { Document } from './model';
export interface User extends Document {
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
	suspended: false
};
export const EmptyUser: User = EmptyNewUser;
