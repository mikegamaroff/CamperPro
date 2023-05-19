import { v4 as uuidv4 } from 'uuid';
import { Document } from './model';
export interface Review extends Document {
	author: string;
	campsite: string;
	first_name: string;
	last_name: string;
	rating: number;
	description: string;
}
export const EmptyNewReview: Review = {
	_id: `review:${uuidv4()}`,
	author: '',
	campsite: '',
	first_name: '',
	last_name: '',
	rating: 0,
	description: ''
};
export const EmptyReview: Review = EmptyNewReview;
