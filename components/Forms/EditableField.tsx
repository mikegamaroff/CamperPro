import classNames from 'classnames';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { FormValueType } from '../../hooks/useFormValues';
import { FormInputParams } from '../../model/form';
import { IconCheck, IconClose, IconEdit } from '../Icons';
import { Input } from './Input';
// eslint-disable-next-line css-modules/no-unused-class
import styles from './FormFields.module.css';

export function EditableField<T, K extends keyof T>({
	setValues,
	id,
	field,
	onSave,
	label,
	type,
	onChange,
	step
}: FormInputParams<T, K>) {
	const [editing, setEditing] = useState(false);
	const [valueSaved, setValueSaved] = useState(false);
	const [valueChanged, setvalueChanged] = useState(false);
	const [intialValue, setInitialValue] = useState(field?.value);

	const inputRef = useRef<HTMLInputElement>(null);
	const startFieldEdit = () => {
		setvalueChanged(false);
		setValueSaved(false);
		setEditing(true);
	};
	const cancelEditing = () => {
		!valueSaved &&
			setValues({
				[id as string]: type === 'number' ? Number(intialValue) : intialValue
			} as FormValueType<T>);
		!valueSaved && valueChanged && onSave && onSave();
	};
	useLayoutEffect(() => {
		if (inputRef.current) {
			inputRef.current.focus();
		}
	}, [editing]);

	useEffect(() => {
		setInitialValue(field?.value);
	}, [field?.value]);
	return (
		<div className={styles.fixedField}>
			{editing ? (
				<>
					<div className={styles.editableControls}>
						<div className={classNames(styles.editableControl, styles.cancel)}>
							<IconClose />
						</div>
						<div
							className={classNames(styles.editableControl, styles.save)}
							onMouseDown={() => {
								setValueSaved(true);
								setvalueChanged(false);
								setEditing(false);
								setInitialValue(field?.value);
								valueChanged && onSave && onSave();
							}}
						>
							<IconCheck />
						</div>
					</div>
					<Input
						id={id as string}
						placeholder={label}
						label={label}
						inputRef={inputRef}
						value={field?.value}
						type={type || 'text'}
						step={step}
						onBlur={e => {
							field?.value && setEditing(false);
							cancelEditing();
						}}
						onChange={e => {
							setValueSaved(false);
							setvalueChanged(true);
							setValues({
								[id as string]: type === 'number' ? Number(e.target.value) : e.target.value
							} as FormValueType<T>);
						}}
						errors={field?.errors && field.errors.length > 0 ? field.errors : []}
						disabled={false}
					/>
				</>
			) : (
				<>
					<div className={styles.fieldHolder}>
						<div className={styles.label}>{label}</div>
						<div className={classNames(styles.fixedFieldContainer, styles.input)} onClick={startFieldEdit}>
							<div className={styles.IonFieldText}>{field?.value}</div>
							<div className={styles.editIcon}>
								<IconEdit />
							</div>
						</div>
					</div>
				</>
			)}
		</div>
	);
}
