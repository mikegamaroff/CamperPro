import { FormSelectParams } from '@model/form';
import { FormValueType } from '../../hooks/useFormValues';
// eslint-disable-next-line css-modules/no-unused-class
import styles from './FormFields.module.css';
import Select from './Select';

export function FormSelect<T, K extends keyof T>({
	setValues,
	id,
	field,
	placeholder,
	nogap,
	label,
	options,
	onChange
}: FormSelectParams<T, K>) {
	return (
		<div className={styles.fieldContainer} style={{ marginBottom: nogap ? '10px' : '30px' }}>
			<Select
				id={id as string}
				placeholder={placeholder}
				label={label}
				options={options}
				value={field?.value as string | number | undefined}
				onChange={e => {
					onChange && onChange(e);
					setValues({
						[id as string]: e.target.value
					} as FormValueType<T>);
				}}
				errors={field?.errors && field.errors.length > 0 ? field.errors : []}
			/>
		</div>
	);
}
