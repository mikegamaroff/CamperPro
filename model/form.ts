import { FieldValuesType, FormValueType } from '../hooks/useFormValues';

export type FormInputParams<T, K extends keyof T> = T[K] extends string | number
	? {
			setValues: (value: FormValueType<T>) => void;
			id: K;
			onPaste?: (e: any) => any;
			field?: FieldValuesType<T[K]>;
			label: string;
			onSave?: () => void;
			disabled?: boolean;
			onKeyDown?: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
			inlineImage?: boolean;
			nogap?: boolean;
			placeholder?: string;
			type?: T[K] extends string ? 'text' | 'password' | 'color' : 'number';
			onChange?: (e: any) => void;
			long?: boolean;
			rows?: number;
			step?: T[K] extends number ? string : never;
			min?: T[K] extends number ? string : never;
			max?: T[K] extends number ? string : never;
			testid?: string;
	  }
	: never;

export type zxcvbnResult = {
	score: number;
	feedback: { warning: string; suggestions: string[] };
};
