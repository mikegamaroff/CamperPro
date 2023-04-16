import { FormValueType } from '../../hooks/useFormValues';
import { FormInputParams } from '../../model/form';
// eslint-disable-next-line css-modules/no-unused-class
import styles from './FormFields.module.css';
import { Input } from './Input';

export function FormInput<T, K extends keyof T>({
	setValues,
	id,
	field,
	nogap,
	label,
	type,
	onChange,
	step
}: FormInputParams<T, K>) {
	return (
		<div className={styles.fieldContainer} style={{ marginBottom: nogap ? '10px' : '30px' }}>
			<Input
				id={id as string}
				placeholder={label}
				label={label}
				value={field?.value}
				type={type || 'text'}
				step={step}
				onBlur={e => {
					setValues({
						[id as string]: type === 'number' ? Number(e.target.value) : e.target.value
					} as FormValueType<T>);
				}}
				onChange={e => {
					onChange && onChange(e);
					setValues({
						[id as string]: type === 'number' ? Number(e.target.value) : e.target.value
					} as FormValueType<T>);
				}}
				errors={field?.errors && field.errors.length > 0 ? field.errors : []}
				disabled={false}
			/>
		</div>
	);
}
