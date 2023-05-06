import { FormValidationRules } from '../hooks/useFormValues';
import { User } from '../model/user';
import { validateEmail, validatePassword } from '../util/validations';

export const UserEditRules: FormValidationRules<User> = {
	username: {
		rules: {
			required: {
				value: true,
				message: 'Username is required'
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
				value: (value: string) => value === '' || validateEmail(value),
				message: 'Incorrectly formatted email'
			}
		}
	},
	password: {
		rules: {
			required: {
				value: true,
				message: 'Password is required'
			},
			func: {
				value: (value: string) => value === '' || validatePassword(value),
				message: 'At least 6 characters ‣ 1 uppercase letter ‣ 1 number'
			}
		}
	}
};
