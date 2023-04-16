import { FormValidationRules } from '../hooks/useFormValues';
import { User } from '../model/user';

export const UserEditRules: FormValidationRules<User> = {
	username: {
		rules: {
			required: {
				value: true,
				message: 'Username is required'
			}
		}
	},
	first_name: {
		rules: {
			required: {
				value: true,
				message: 'Description is required'
			}
		}
	},
	email: {
		rules: {
			required: {
				value: true,
				message: 'Email is required'
			},
			func: {
				value: (value: string) => value === '',
				message: 'Incorrectly formatted email'
			}
		}
	}
};
