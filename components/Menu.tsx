// MenuContent.tsx
import React, { useContext } from 'react';
import { EmptyNewCampsite } from '../model/campsite';
import { useAddCampsite } from '../routes/useAddCampsite';
import Button from './Forms/Button';
import { IconButton } from './Forms/IconButton';
import { IconClose } from './Icons';
import styles from './Menu.module.css';

import { CampsiteContext } from '../context/campsiteContext';
const MenuContent: React.FC<{ onClose: () => void }> = ({ onClose }) => {
	const { campsites, addCampsite, isLoading, isError, isSuccess } = useAddCampsite();
	const { setCampsites } = useContext(CampsiteContext);
	const handleAddCampsite = async () => {
		const newCampsite = {
			...EmptyNewCampsite,
			title: 'Example Campsite'
			// Add other campsite properties
		};

		try {
			const response = await addCampsite(newCampsite);
			if (response.success) {
				setCampsites([...campsites, newCampsite]);
				const navigationEvent = new CustomEvent('navigateTo', { detail: `/CampsiteEdit/${newCampsite._id}` });
				window.dispatchEvent(navigationEvent);
				onClose();
			} else {
				console.error('Error adding campsite:', response.message);
			}
		} catch (error) {
			console.error('Error adding campsite:', error instanceof Error ? error.message : 'Unknown error');
		}
	};

	return (
		<div>
			<div className={styles.closeButton}>
				<IconButton size="small" icon={<IconClose />} onClick={onClose} />
			</div>

			<Button onClick={handleAddCampsite}>Add Campsite</Button>
		</div>
	);
};

export default MenuContent;
