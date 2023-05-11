// MenuContent.tsx
import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { EmptyNewCampsite } from '../model/campsite';
import { useAddCampsite } from '../routes/useAddCampsite';
import { GoTo } from '../util/GoTo';
import Button from './Forms/Button';
import { IconButton } from './Forms/IconButton';
import { IconClose } from './Icons';
import styles from './Menu.module.css';
const MenuContent: React.FC<{ onClose: () => void }> = ({ onClose }) => {
	const { addCampsite, isLoading, isError, isSuccess } = useAddCampsite();

	const handleAddCampsite = async () => {
		const newId = uuidv4(); // replace this with your ID generation logic

		const newCampsite = {
			...EmptyNewCampsite,
			_id: 'campsite:' + newId,
			title: 'Example Campsite'
			// Add other campsite properties
		};

		try {
			const response = await addCampsite(newCampsite);
			if (response.success) {
				GoTo(`/CampsiteEdit/${newCampsite._id}`);
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
