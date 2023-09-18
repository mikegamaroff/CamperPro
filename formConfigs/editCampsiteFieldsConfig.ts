import { Campsite } from '@model/campsite';
import { FormValidationRules } from '../hooks/useFormValues';

export const CampsiteEditRules: FormValidationRules<Campsite> = {
	title: {
		rules: {
			required: {
				value: true,
				message: 'Title is required'
			}
		}
	},
	description: {
		rules: {
			required: {
				value: true,
				message: 'Description is required'
			}
		}
	}
};
