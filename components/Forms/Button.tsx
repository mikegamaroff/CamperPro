import React from 'react';

interface CustomIonButtonProps {
	color?: string;
	className?: string;
	fill?: string;
	target?: string;
	slot?: string;
	disabled?: boolean;
	href?: string;
	onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
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
			href,
			onClick
		},
		children
	);
};

export default Button;
