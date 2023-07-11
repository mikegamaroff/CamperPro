// eslint-disable-next-line css-modules/no-unused-class
import { FormValueType } from '@hooks/useFormValues';
import { FormInputParams } from '../../model/form';
// eslint-disable-next-line css-modules/no-unused-class
import styles from './FormFields.module.css';
import { TextArea } from './TextArea';

export function FormTextarea<T, K extends keyof T>({
	setValues,
	id,
	field,
	label,
	placeholder,
	disabled,
	onKeyDown,
	type,
	nogap,
	onPaste,
	long,
	rows,
	testid
}: FormInputParams<T, K>) {
	return (
		<div className={styles.fieldContainer} style={{ marginBottom: nogap ? 0 : '30px' }} data-testid={testid}>
			<TextArea
				long={long}
				id={id as string}
				label={label}
				disabled={disabled}
				onKeyDown={onKeyDown}
				onPaste={onPaste}
				inlineImage
				placeholder={placeholder ?? label}
				value={field?.value}
				rows={rows}
				type={type || 'text'}
				onBlur={e => {
					setValues({
						[id]: e.target.value
					} as FormValueType<T>);
				}}
				onChange={e => {
					setValues({
						[id]: e.target.value
					} as FormValueType<T>);
				}}
				errors={field?.errors && field.errors.length > 0 ? field.errors : []}
			/>
		</div>
	);
}
