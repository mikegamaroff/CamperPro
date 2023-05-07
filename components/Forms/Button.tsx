import React, { MouseEvent } from 'react';

interface CustomIonButtonProps {
	color?: string;
	className?: string;
	fill?: string;
	target?: string;
	slot?: string;
	size?: string;
	expand?: string;
	tabIndex?: number;
	disabled?: boolean;
	href?: string;
	onClick?: (event: MouseEvent<HTMLButtonElement, MouseEvent>) => void | Promise<void>;
	children?: React.ReactNode;
}

const Button: React.FC<CustomIonButtonProps> = ({
	color,
	className,
	fill,
	target,
	slot,
	disabled,
	href,
	size,
	expand,
	tabIndex,
	onClick,
	children
}) => {
	return React.createElement(
		'ion-button',
		{
			color,
			class: className,
			fill,
			slot,
			target,
			disabled,
			size,
			expand,
			tabIndex,
			href,
			onClick
		},
		children
	);
};

export default Button;