// MenuContent.tsx
import React from 'react';
import { IconButton } from './Forms/IconButton';
import { IconClose } from './Icons';
import styles from './Menu.module.css';
const MenuContent: React.FC<{ onClose: () => void }> = ({ onClose }) => {
	return (
		<div>
			<div className={styles.closeButton}>
				<IconButton size="small" icon={<IconClose />} onClick={onClose} />
			</div>
		</div>
	);
};

export default MenuContent;
