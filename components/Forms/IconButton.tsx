import classNames from 'classnames';
import React, { MouseEvent } from 'react';
import Button from './Button';
import styles from './IconButton.module.css';
interface ButtonProps {
	icon: JSX.Element;
	label?: string | number | JSX.Element;
	onClick?: (event: MouseEvent<HTMLButtonElement, MouseEvent>) => void | Promise<void>;
	className?: string;
	href?: string;
	size?: 'small';
	iconRight?: boolean;
	iconColor?: string;
	disabled?: boolean;
}

export const IconButton: React.FC<ButtonProps> = ({ size, icon, label, onClick, iconRight, href, disabled }) => {
	const Icon = React.cloneElement(icon, { size: size === 'small' ? 18 : 24 });
	return (
		<div>
			<Button
				className={classNames(['icon-button', size === 'small' ? styles.textSmall : styles.textRegular])}
				fill="clear"
				target="_self"
				color="none"
				disabled={disabled || false}
				href={href && href}
				onClick={onClick && onClick}
			>
				{[
					!iconRight && <span key="icon-left">{Icon}</span>,
					label && (
						<div
							key="icon-label"
							className={classNames(styles.label, iconRight ? styles.iconRight : styles.iconLeft)}
						>
							{label}
						</div>
					),
					iconRight && <span key="icon-right">{Icon}</span>
				].filter(Boolean)}
			</Button>
		</div>
	);
};
