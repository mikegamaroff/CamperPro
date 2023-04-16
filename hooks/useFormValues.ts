/* 
This hook does the following:
1. Inspects the form config file (/formConfigs) to determine the list of fields in your form
2. Generates a state object called formValues containing all your blank fields without values
3. setValues then takes your form input in formValues and runs your fields through the validator
4. Once passing validation, the values plus any errors are updated in the formValues state object
5. Your form will reflect the error messages
 */

import { useCallback, useEffect, useState } from 'react';

import { validate } from '../util/validations';

export type Rules = {
	minLength: number;
	maxLength: number;
	pattern: RegExp;
	func: (value: string) => boolean;
	required: boolean;
};

export type FieldValuesType<Type> = {
	value: Type;
	errors: string[] | [];
};

export type FormValuesType<T> = {
	[Property in keyof T]?: FieldValuesType<T[Property]>;
};
export type FormRuleType<Type> = {
	value: Type;
	message: string;
};

export type FormConfigRules = {
	[Property in keyof Rules]?: FormRuleType<Rules[Property]>;
};
export type FormConfigType = {
	rules?: FormConfigRules;
};
export type FormValidationRules<T> = {
	[Property in keyof T]?: FormConfigType;
};

export type FormValueType<T> = {
	[Property in keyof T]?: T[Property];
};

export type SetValuesCallback<T> = (value: FormValuesType<T>) => FormValueType<T>;
export type SetValuesFunction<T> = (value: FormValueType<T> | SetValuesCallback<T>) => void;

export type FormHookReturnType<T> = {
	formSuccess: boolean;
	setValues: SetValuesFunction<T>;
	formValues: FormValuesType<T> | undefined;
	validateForm: () => boolean;
	stateDataObject: T | null | undefined;
};

/**
 * Form validation hook, it takes as parameters the form validation rules and the data object to prepopulate the form with
 * data, it returns the form values and setValues function.
 * @param { FormValidationRules } formConfig The form validation rules
 * @param { T } dataObject The data object to prepopulate the form with
 * @param { function } equals Returns true if the two arguments represent the same object, usually id equality, not deep,
 * @default JSON.stringify
 * @returns { FormHookReturnType<T> | undefined} The form values and setValues function
 */
export const useFormValues = <T>(
	formConfig: FormValidationRules<T>,
	dataObject: T | null | undefined,
	equals?: (dataObject1?: T | null, dataObject2?: T | null) => boolean
): FormHookReturnType<T> => {
	const [formValues, setFormValues] = useState<FormValuesType<T> | undefined>(undefined);
	const [stateDataObject, setStateDataObject] = useState<T | null | undefined>(null);

	// If the incoming data object's reference changes, update the state data object
	// But do a deep compare to avoid infinite loop
	useEffect(
		() =>
			setStateDataObject(oldDataObject => {
				const dataIsSameObject = equals
					? equals(dataObject, oldDataObject)
					: JSON.stringify(dataObject) === JSON.stringify(oldDataObject);

				if (!dataIsSameObject) {
					const totalFieldsArray = Object.keys(dataObject || formConfig) as (keyof T)[];
					let blankValuesContainer: FormValuesType<T> = {};
					totalFieldsArray.forEach(fieldName => {
						const val: FormValuesType<T> = {
							[fieldName]: {
								value: dataObject ? dataObject[fieldName] : '',
								errors: []
							}
						} as FormValuesType<T>;
						blankValuesContainer = {
							...blankValuesContainer,
							...val
						};
					});
					setFormValues(blankValuesContainer);

					return dataObject;
				} else {
					return oldDataObject;
				}
			}),
		[dataObject, formConfig, equals]
	);

	const setValues = useCallback(
		(value: FormValueType<T> | SetValuesCallback<T>) => {
			setFormValues(currentFormValues => {
				let newValue: FormValueType<T> | null = null;
				if (typeof value === 'function' && currentFormValues) {
					// If callback version, call the callback with the current values.
					newValue = value(currentFormValues);
				} else if (typeof value !== 'function') {
					newValue = value;
				}

				if (newValue) {
					setStateDataObject(currrentDataObject => {
						return { ...currrentDataObject, ...newValue } as T;
					});
					const name = Object.keys(newValue)[0] as keyof T;

					let errors: string[] | [] = [];
					const rule = formConfig[name];
					if (rule) {
						({ errors } = validate(rule, newValue[name] as any));
					}
					return {
						...currentFormValues,
						[name]: { value: newValue[name], errors }
					};
				} else {
					return currentFormValues;
				}
			});
		},
		[formConfig]
	);

	/**
	 * Force validate the form
	 * @returns { boolean } true if all fields are valid, false if any field is invalid
	 */
	const validateForm = (): boolean => {
		if (formValues) {
			const totalFieldsArray = Object.keys(formValues) as (keyof T)[];
			let blankValuesContainer: FormValuesType<T> = {};

			totalFieldsArray.forEach(fieldName => {
				const { errors } = validate(
					formConfig[fieldName] as FormConfigType,
					formValues[fieldName]?.value as string
				);
				const val: FormValuesType<T> = {
					[fieldName]: {
						value: formValues[fieldName]?.value,
						errors
					}
				} as FormValuesType<T>;
				blankValuesContainer = {
					...blankValuesContainer,
					...val
				};
			});

			setFormValues(blankValuesContainer);
			return getErrorCount(blankValuesContainer) === 0;
		}
		return true;
	};

	/**
	 * Count the total errors in the form
	 * @param { FormValuesType } formValues The form values
	 * @returns { number } count of errors
	 */
	const getErrorCount = (formValues?: FormValuesType<T>): number => {
		let i = 0;
		formValues &&
			Object.values(formValues).forEach(fieldValue => {
				(fieldValue as FieldValuesType<T>).errors.length > 0 && i++;
			});
		return i;
	};

	return {
		formSuccess: getErrorCount(formValues) === 0,
		setValues,
		formValues,
		validateForm,
		stateDataObject
	};
};
