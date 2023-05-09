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
	const handleClick = (event: MouseEvent<HTMLButtonElement, MouseEvent>) => {
		if (onClick) {
			onClick(event);
		}

		if (href) {
			event.preventDefault();
			const navigationEvent = new CustomEvent('navigateTo', { detail: href });
			window.dispatchEvent(navigationEvent);
		}
	};

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
			onClick: handleClick
		},
		children
	);
};

export default Button;
