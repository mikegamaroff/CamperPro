import { FieldValuesType, FormValueType } from '../hooks/useFormValues';

type CommonParams<T, K extends keyof T> = {
	setValues: (value: FormValueType<T>) => void;
	id: K;
	onPaste?: (e: any) => any;
	type?: 'text' | 'number' | 'password' | 'email' | 'color';
	field?: FieldValuesType<T[K]>;
	label: string;
	onSave?: () => void;
	disabled?: boolean;
	onKeyDown?: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
	inlineImage?: boolean;
	nogap?: boolean;
	placeholder?: string;
	onChange?: (e: any) => void;
	long?: boolean;
	rows?: number;
	testid?: string;
	value?: T[K];
	step?: string;
};

type NumberParams = {
	type?: 'number';
	min?: string;
	max?: string;
};

type TextParams = {
	type?: 'text' | 'password' | 'color';
};
type AdditionalParams = {
	any?: string;
	// Add any additional fields that might be unique to specific usages here
};
export type FormInputParams<T, K extends keyof T, Addl extends AdditionalParams = { any?: string }> = CommonParams<
	T,
	K
> &
	(T[K] extends number ? NumberParams : T[K] extends string ? TextParams : Addl);

export type FormSelectParams<T, K extends keyof T, Addl extends AdditionalParams = { any?: string }> = CommonParams<
	T,
	K
> &
	(T[K] extends number ? NumberParams : T[K] extends string ? TextParams : Addl) & {
		options: { value: T[K]; label: string }[];
	};
