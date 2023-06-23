import React, { ChangeEvent, ClipboardEventHandler, useCallback, useState } from 'react';
import { IconEye, IconEyeOff } from '../Icons';
import { FormErrors } from './FormErrors';
// eslint-disable-next-line css-modules/no-unused-class
import styles from './FormFields.module.css';
import { IconButton } from './IconButton';

interface InputProps<T> {
	placeholder?: string;
	name?: string;
	type?: 'text' | 'number' | 'password' | 'email' | 'color';
	label?: string;
	onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
	onBlur?: (e: ChangeEvent<HTMLInputElement>) => void;
	onPaste?: ClipboardEventHandler<HTMLInputElement> | undefined;
	autoComplete?: string;
	errors?: string[];
	color?: string;
	disabled?: boolean;
	width?: string;
	gap?: number;
	value?: T | undefined;
	inputRef?: React.RefObject<HTMLInputElement>;
	id?: string;
	step?: string;
	tabIndex?: number;
	className?: string;
}

export function Input<T extends string | number>({
	placeholder,
	name,
	value,
	type,
	label,
	onChange,
	onBlur,
	onPaste,
	tabIndex,
	autoComplete,
	disabled,
	errors,
	color,
	width,
	id,
	step,
	className,
	inputRef
}: InputProps<T>): JSX.Element {
	const [passwordVisible, setPasswordVisible] = useState(false);
	const unmaskPassword = () => {
		setPasswordVisible(!passwordVisible);
	};

	const fieldType = useCallback(() => {
		if (type === 'password') {
			if (passwordVisible) {
				return 'text';
			} else {
				return 'password';
			}
		} else {
			return type || 'text';
		}
	}, [passwordVisible, type]);

	function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
		if (event.key === 'Enter' && onBlur) {
			const blurEvent = new Event('blur');
			onBlur(blurEvent as unknown as React.FocusEvent<HTMLInputElement>);
		}
	}
	return (
		<div style={{ width: width || '100%' }}>
			{label && <div className={styles.label}>{label}</div>}

			<div className={styles.inputContainer}>
				{type === 'password' && (
					<div className={styles.fieldIcon}>
						<IconButton
							size="small"
							icon={passwordVisible ? <IconEyeOff /> : <IconEye />}
							onClick={unmaskPassword}
						/>
					</div>
				)}
				<input
					style={{
						color: errors && errors.length > 0 ? 'red' : color,
						paddingRight: type === 'password' ? '45px' : '0px'
					}}
					tabIndex={tabIndex}
					className={className || styles.input}
					id={id && id}
					placeholder={placeholder || 'Placeholder'}
					name={name && name}
					type={fieldType()}
					step={step || undefined}
					disabled={disabled}
					value={value || ''}
					// step={step ? step : undefined}
					onBlur={onBlur && onBlur}
					onKeyDown={handleKeyDown}
					onChange={onChange && onChange}
					onPaste={onPaste && onPaste}
					ref={inputRef}
					autoComplete={autoComplete || 'off'}
				></input>
			</div>
			<FormErrors errors={errors} />
		</div>
	);
}
