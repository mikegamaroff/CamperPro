import classNames from 'classnames';
import { FormErrors } from './FormErrors';
// eslint-disable-next-line css-modules/no-unused-class
import styles from './FormFields.module.css';
interface TextAreaProps {
	placeholder?: string;
	name?: string;
	onChange?: (e: any) => void;
	onBlur?: (e: any) => void;
	autoComplete?: string;
	inlineImage?: boolean;
	errors?: string[];
	maxLength?: number;
	color?: string;
	disabled?: boolean;
	onKeyDown?: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
	width?: string;
	error?: boolean;
	gap?: number;
	value?: string | undefined;
	id?: string;
	rows?: number;
	label?: string;
	long?: boolean;
	testid?: string;
	onPaste?: (e: any) => void;
}

export const TextArea: React.FC<TextAreaProps> = ({
	placeholder,
	name,
	value,
	rows,
	onChange,
	onBlur,
	autoComplete,
	disabled,
	onKeyDown,
	inlineImage,
	maxLength,
	errors,
	color,
	error,
	width,
	onPaste,
	id,
	long,
	label,
	testid
}) => {
	return (
		<div className={styles.fieldHolder} style={{ width: width || '100%' }}>
			<div className={styles.label}>{label}</div>
			<textarea
				style={{
					color: error ? 'red' : color,
					borderRadius: inlineImage ? `8px 0 8px 8px` : '8px'
				}}
				className={classNames(styles.textarea, long && styles.long)}
				id={id && id}
				placeholder={placeholder || 'Placeholder'}
				name={name && name}
				onKeyDown={onKeyDown}
				disabled={disabled}
				maxLength={maxLength}
				rows={rows || 4}
				value={value}
				onBlur={onBlur && onBlur}
				onChange={onChange && onChange}
				onPaste={onPaste && onPaste}
				autoComplete={autoComplete || 'off'}
				data-testid={testid}
			></textarea>
			<FormErrors errors={errors} />
		</div>
	);
};
