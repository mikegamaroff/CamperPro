import { Review } from '@model/review';
import { FormValidationRules } from '../hooks/useFormValues';

export const AddReviewRules: FormValidationRules<Review> = {
	review: {
		rules: {
			required: {
				value: true,
				message: 'Must write a review'
			},
			maxLength: {
				value: 10,
				message: 'Must be less than 10 characters'
			}
		}
	}
};
