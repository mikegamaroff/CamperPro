import { IconChevronDown } from '@components/Icons';
import React, { useEffect, useRef } from 'react';
import { FormErrors } from './FormErrors';
// eslint-disable-next-line css-modules/no-unused-class
import styles from './FormFields.module.css';
interface CustomIonSelectProps<T> {
	id?: string;
	placeholder?: string;
	label?: string;
	options: { value: T; label: string }[];
	value?: T | undefined;
	onChange?: (event: CustomEvent) => void | Promise<void>;
	errors?: string[];
}

const Select: React.FC<CustomIonSelectProps<any>> = ({ id, placeholder, label, options, value, onChange, errors }) => {
	const selectRef = useRef<any>(null);

	useEffect(() => {
		const select = selectRef.current;
		if (select) {
			select.addEventListener('ionChange', onChange);
			return () => select.removeEventListener('ionChange', onChange);
		}
	}, [onChange]);

	return (
		<div className="relative">
			{label && <div>{label}</div>}
			<div className="select-icon">
				<IconChevronDown />
			</div>
			{React.createElement(
				'ion-select',
				{
					id,
					class: styles.input,
					justify: 'start',
					style: { padding: 0 },
					'label-placement': 'stacked',
					placeholder,
					value,
					ref: selectRef
				},
				options.map(({ value, label }) =>
					React.createElement('ion-select-option', { value, key: value }, label)
				)
			)}
			<FormErrors errors={errors} />
		</div>
	);
};

export default Select;
