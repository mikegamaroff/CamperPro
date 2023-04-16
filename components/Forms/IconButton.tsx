import classNames from 'classnames';
import React from 'react';
import Button from './Button';
import styles from './IconButton.module.css';
interface ButtonProps {
	icon: JSX.Element;
	label?: string | number | JSX.Element;
	onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
	className?: string;
	href?: string;
	size?: 'small';
	iconRight?: boolean;
	iconColor?: string;
	disabled?: boolean;
}

export const IconButton: React.FC<ButtonProps> = ({ size, icon, label, onClick, iconRight, href, disabled }) => (
	<div>
		<Button
			color={'tertiary'}
			className={classNames(['icon-button', size === 'small' ? styles.textSmall : styles.textRegular])}
			fill="clear"
			target="_self"
			disabled={disabled || false}
			href={href && href}
			onClick={onClick && onClick}
		>
			{[
				!iconRight && icon,
				label && (
					<div className={classNames(styles.label, iconRight ? styles.iconRight : styles.iconLeft)}>
						{label}
					</div>
				),
				iconRight && icon
			].filter(Boolean)}
		</Button>
	</div>
);
