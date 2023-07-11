import { Review } from '@model/review';
import { FormValidationRules } from '../hooks/useFormValues';

export const AddReviewRules: FormValidationRules<Review> = {
	review: {
		rules: {
			required: {
				value: true,
				message: 'Must write a review'
			}
		}
	}
};
