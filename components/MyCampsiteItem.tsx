import { Campsite } from '@model/campsite';
import { GoTo } from '@utils/GoTo';
import defaultImage from 'assets/defaultCampsite.png';
import classNames from 'classnames';
import Image from 'next/image';
import React from 'react';
import { IconButton } from './Forms/IconButton';
import { IconEdit, IconTrash } from './Icons';
import styles from './MyCampsiteItem.module.css';
interface MyCampsiteItemProps {
	campsite?: Campsite;
	deleting: boolean;
	handleDeleteCampsite: (campsite: Campsite) => Promise<void>;
}

export const MyCampsiteItem: React.FC<MyCampsiteItemProps> = ({ campsite, handleDeleteCampsite, deleting }) => {
	const image = campsite?.images?.[0];
	const deleteCampsite = () => {
		if (campsite) {
			handleDeleteCampsite(campsite);
		}
	};

	const handleEditCampsite = () => {
		GoTo(`/campsite/edit/${campsite?._id}`);
	};
	return (
		<div>
			<div className={styles.MyCampsiteItemContainer} style={{ opacity: campsite?.draft ? 0.6 : 1 }}>
				<div
					className={styles.myCampsitePhoto}
					style={{
						filter: campsite?.draft ? `grayscale(70%)` : `grayscale(0%)`
					}}
				>
					<Image
						src={image ? `/api/images/${image?.id}.${image?.contentType.split('/')[1]}` : defaultImage}
						alt="Campsite Image"
						fill
						style={{ objectFit: 'cover' }}
					/>
				</div>
				<div className={styles.myCampsiteContent}>
					<h4 className={classNames(styles.myCampsiteTitle, 'medium')}>
						{deleting ? 'Deleting...' : campsite?.title}
					</h4>
					<div className={styles.myCampsiteAddress}>
						{campsite?.location?.nearestTown}, {campsite?.location?.state}
					</div>
					<div className={styles.myCampsiteDescriotion}>{campsite?.description}</div>
				</div>
				<div className={styles.myCampsiteControls}>
					<div className={styles.myCampsiteControl}>
						<IconButton onClick={handleEditCampsite} icon={<IconEdit />} />
					</div>
					<div className={styles.myCampsiteControl} style={{ border: 'none' }}>
						<IconButton onClick={deleteCampsite} icon={<IconTrash />} />
					</div>
				</div>
			</div>
		</div>
	);
};
