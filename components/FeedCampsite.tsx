import { useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { CampsiteContext } from '../context/campsiteContext';
import { Campsite } from '../model/campsite';
import { CampsiteImages } from './CampsiteImages';
import styles from './FeedCampsite.module.css';
import { Go } from './Go';
import { IconStar } from './Icons';
import { UploadImageButton } from './UploadImageButton';

export const FeedCampsite: React.FC<{ campsite: Campsite }> = ({ campsite }) => {
	const { updateImage } = useContext(CampsiteContext);

	return (
		<div className={styles.feedCampsite}>
			<div className={styles.images}>
				<CampsiteImages campsite={campsite} />
			</div>
			<div className={styles.uploadImage}>
				<UploadImageButton<Campsite> documentId={campsite?._id} key={uuidv4()} onSuccess={updateImage} />
			</div>
			<Go href={`/campsite/${campsite._id}`}>
				<div className={styles.campsiteInfo}>
					<div className={styles.titleAndRating}>
						<h4>{campsite.title}</h4>

						<div className={styles.rating}>
							<IconStar size={18} />
							<h5 style={{ marginTop: '2px' }}>{campsite.rating}</h5>
						</div>
					</div>
					<h5 className={styles.greyText}>{campsite.location.receptionAddress.city}</h5>
					<div className={styles.price}>
						<h4>{`$${campsite.pricePerNight} `}</h4>
						<h5 className={styles.greyText}>per night</h5>
					</div>
				</div>
			</Go>
		</div>
	);
};
