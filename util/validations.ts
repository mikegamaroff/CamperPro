/*
This validator does a number of checks
1. First it checks the field.rules for any rules in the form (passed via useFormValues hook from config)
2. If it finds rules, it grabs the name of the rule and plucks out the validation method from validationFunctions
3. If there's an error, it updates the errors array and increments the successFlag counter
4. After checking the field it returns success boolean and error message array (in the event of more than one message)

'validationFunctions' has all the validator functions that are possible. 
The formConfig file needs to specify what validators it wants for each form
*/

import { FormConfigType, FormRuleType, Rules } from '../hooks/useFormValues';

export const validate: (field: FormConfigType, value: string) => { success: boolean; errors: string[] } = (
	field: FormConfigType,
	value: string
) => {
	if (!field) {
		// No rules for this field
		return {
			success: true,
			errors: []
		};
	}
	const validationRules = (field && field.rules ? Object.keys(field.rules) : []) as (keyof Rules)[];
	let successFlag = 0;
	let errors: string[] = [];
	let success: boolean;
	if (field.rules) {
		for (let i = 0; i < validationRules.length; i++) {
			const tempRuleName = validationRules[i];
			const tempRule = field.rules[tempRuleName];
			if (tempRule) {
				const { success, message } = validationFunctions[tempRuleName](tempRule as any, value);
				message && errors.push(message.replace('{value}', tempRule.value.toString()));
				success && successFlag++;
			}
		}
		success = successFlag === validationRules.length;
	} else {
		success = true;
		errors = [];
	}
	return {
		success,
		errors: success ? [] : errors
	};
};

type ValidationFunction<Type> = (
	rule: FormRuleType<Type>,
	value?: string
) => { success: boolean; message: string | null };

type ValidationFunctions = {
	[Property in keyof Rules]: ValidationFunction<Rules[Property]>;
};

const validationFunctions: ValidationFunctions = {
	maxLength: (rule, value) => {
		let success = true;
		if (value && value.length > Number(rule.value)) {
			success = false;
		}
		return { success, message: success ? null : rule.message };
	},
	minLength: (rule, value) => {
		let success = true;
		if (value && value.length < Number(rule.value)) {
			success = false;
		}
		return { success, message: success ? null : rule.message };
	},
	pattern: (rule, value) => {
		let success = true;
		if (value && !value.match(rule.value) && value.length > 0) {
			success = false;
		}
		return { success, message: success ? null : rule.message };
	},

	required: (rule, value) => {
		let success = true;
		if (value?.length === 0) {
			success = false;
		}
		return { success, message: success ? null : rule.message };
	},

	func: (rule, value) => {
		let success = false;
		if (rule.value && rule.value(value || '')) {
			success = true;
		}
		return { success, message: success ? null : rule.message };
	}
};
