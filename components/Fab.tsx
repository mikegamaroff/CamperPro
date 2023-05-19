import React from 'react';
import styles from './Fab.module.css';
import Button from './Forms/Button';
import { IconFire } from './Icons';

interface FabProps {
	icon?: JSX.Element;
	onClick: () => void;
}

export const Fab: React.FC<FabProps> = ({ icon = <IconFire />, onClick }) => {
	const fixedSizeIcon = React.cloneElement(icon, { size: 40 });

	return (
		<Button fill="clear" className={styles.fabContainer} onClick={onClick}>
			{fixedSizeIcon}
		</Button>
	);
};
