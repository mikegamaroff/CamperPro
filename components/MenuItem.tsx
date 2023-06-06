// MenuContent.tsx
import React, { ReactElement } from 'react';
// eslint-disable-next-line css-modules/no-unused-class
import sharedStyles from '../styles/shared.module.css';
const MenuItem: React.FC<{ label: string; icon?: ReactElement; onClick?: () => void; underline?: boolean }> = ({
	label,
	icon,
	onClick,
	underline = true
}) => {
	return (
		<div
			className={sharedStyles.menuItemContainer}
			onClick={onClick && onClick}
			style={{ borderBottom: !underline ? 'none' : `1px solid var(--neutral50)` }}
		>
			{icon && <div className={sharedStyles.menuItemLabel}>{icon}</div>}
			<div className={sharedStyles.menuItemLabel}>{label}</div>
		</div>
	);
};

export default MenuItem;
