import { v4 as uuidv4 } from 'uuid';
import { Document } from './model';
export interface Review extends Document {
	_id: string;
	rating: number;
	title: string;
	review: string;
	author: string;
	campsite: string;
}
export const EmptyNewReview: Review = {
	_id: `review:${uuidv4()}`,
	type: 'review',
	created_at: new Date().toISOString(),
	updated_at: new Date().toISOString(),
	rating: 0,
	title: '',
	review: '',
	author: '',
	campsite: ''
};

export const EmptyReview: Review = EmptyNewReview;
