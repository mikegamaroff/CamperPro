import { Campsite } from '@model/campsite';
import useDeleteCampsite from '@routes/useDeleteCampsite';
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
}

export const MyCampsiteItem: React.FC<MyCampsiteItemProps> = ({ campsite }) => {
	const image = campsite?.images?.[0];
	const { deleteCampsite, isLoading: deleting } = useDeleteCampsite();
	const handleDeleteCampsite = async () => {
		if (campsite) {
			const response = await deleteCampsite(campsite?._id ?? '');
			if (response.success) {
				console.log(response);
				// GoTo('/');
			} else {
				console.log(response);
				// Handle error
			}
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
					<h5 className={classNames(styles.myCampsiteTitle, 'medium')}>
						{deleting ? 'Deleting...' : campsite?.title}
					</h5>
					<div>
						{campsite?.location?.nearestTown}, {campsite?.location?.state}
					</div>
					<div className={styles.myCampsiteDescriotion}>{campsite?.description}</div>
				</div>
				<div className={styles.myCampsiteControls}>
					<div className={styles.myCampsiteControl}>
						<IconButton onClick={handleEditCampsite} icon={<IconEdit />} />
					</div>
					<div className={styles.myCampsiteControl} style={{ border: 'none' }}>
						<IconButton onClick={handleDeleteCampsite} icon={<IconTrash />} />
					</div>
				</div>
			</div>
		</div>
	);
};
