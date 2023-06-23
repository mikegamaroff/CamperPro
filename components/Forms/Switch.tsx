import React, { ChangeEvent, useEffect, useRef } from 'react';

interface CustomIonSwitchProps {
	color?: string;
	className?: string;
	id?: string;
	slot?: string;
	disabled?: boolean;
	checked?: boolean;
	justify?: 'end' | 'space-between' | 'start';
	labelPlacement?: 'end' | 'fixed' | 'start';
	mode?: 'ios' | 'md';
	onIonChange?: (event: ChangeEvent<HTMLInputElement>) => void | Promise<void>;
	children?: React.ReactNode;
}

const Switch: React.FC<CustomIonSwitchProps> = ({
	color,
	className,
	slot,
	id,
	disabled,
	checked,
	onIonChange,
	justify,
	labelPlacement,
	mode = 'ios',
	children
}) => {
	const switchRef = useRef<any>();

	useEffect(() => {
		const ionSwitch = switchRef.current;
		if (ionSwitch) {
			ionSwitch.addEventListener('ionChange', onIonChange);
			return () => ionSwitch.removeEventListener('ionChange', onIonChange);
		}
	}, [onIonChange]); // dependency array

	return React.createElement(
		'ion-toggle',
		{
			color,
			class: className,
			slot,
			id,
			disabled,
			checked,
			justify,
			mode,
			labelPlacement,
			ref: switchRef
		},
		children
	);
};

export default Switch;
