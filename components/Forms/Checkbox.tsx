import React, { MouseEvent } from 'react';

interface CustomIonCheckboxProps {
	color?: string;
	className?: string;
	slot?: string;
	disabled?: boolean;
	checked?: boolean;
	onIonChange?: (event: MouseEvent<HTMLInputElement, MouseEvent>) => void | Promise<void>;
	children?: React.ReactNode;
}

const Checkbox: React.FC<CustomIonCheckboxProps> = ({
	color,
	className,
	slot,
	disabled,
	checked,
	onIonChange,
	children
}) => {
	const handleChange = (event: MouseEvent<HTMLInputElement, MouseEvent>) => {
		if (onIonChange) {
			onIonChange(event);
		}
	};

	return React.createElement(
		'ion-checkbox',
		{
			color,
			class: className,
			slot,
			disabled,
			checked,
			onIonChange: handleChange
		},
		children
	);
};

export default Checkbox;
