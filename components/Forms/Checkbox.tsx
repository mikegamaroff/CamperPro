import React, { ChangeEvent, useEffect, useRef } from 'react';

interface CustomIonCheckboxProps {
	color?: string;
	className?: string;
	id?: string;
	slot?: string;
	disabled?: boolean;
	checked?: boolean;
	onIonChange?: (event: ChangeEvent<HTMLInputElement>) => void | Promise<void>;
	children?: React.ReactNode;
}

const Checkbox: React.FC<CustomIonCheckboxProps> = ({
	color,
	className,
	slot,
	id,
	disabled,
	checked,
	onIonChange,
	children
}) => {
	const checkboxRef = useRef<any>();

	useEffect(() => {
		const checkbox = checkboxRef.current;
		if (checkbox) {
			checkbox.addEventListener('ionChange', onIonChange);
			return () => checkbox.removeEventListener('ionChange', onIonChange);
		}
	}, [onIonChange]); // dependency array

	return React.createElement(
		'ion-checkbox',
		{
			color,
			class: className,
			slot,
			id,
			disabled,
			checked,
			ref: checkboxRef
		},
		children
	);
};

export default Checkbox;
