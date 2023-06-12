import { FieldValuesType, FormValueType } from '../hooks/useFormValues';

export type FormInputParams<T, K extends keyof T> = T[K] extends string | number
	? {
			setValues: (value: FormValueType<T>) => void;
			id: K;
			onPaste?: (e: any) => any;
			onSave?: () => void;
			field?: FieldValuesType<T[K]>;
			label: string;
			nogap?: boolean;
			placeholder?: string;
			type?: T[K] extends string ? 'text' | 'color' | 'password' : 'number' | 'color';
			onChange?: (e: any) => void;
			long?: boolean;
			rows?: number;
			step?: T[K] extends number ? string : never;
	  }
	: never;

export type zxcvbnResult = {
	score: number;
	feedback: { warning: string; suggestions: string[] };
};
