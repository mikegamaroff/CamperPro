import { Campsite } from '@model/campsite';
import { FormValidationRules } from '../hooks/useFormValues';

export const CampsiteEditRules: FormValidationRules<Campsite> = {
	title: {
		rules: {
			required: {
				value: true,
				message: 'Username is required'
			}
		}
	},
	description: {
		rules: {
			required: {
				value: true,
				message: 'Email is required'
			}
		}
	},
	pricePerNight: {
		rules: {
			required: {
				value: true,
				message: 'Email is required'
			}
		}
	}
};
