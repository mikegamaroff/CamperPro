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
			<div style={{ marginTop: '-100%', marginBottom: '87.5%', marginLeft: '80%' }}>
				<UploadImageButton<Campsite> documentId={campsite?._id} key={uuidv4()} onSuccess={updateImage} />
			</div>
			<div className={styles.campsiteInfo}>
				<div className={styles.titleAndRating}>
					<Go href={`/campsite/${campsite._id}`}>
						<h4>{campsite.title}</h4>
					</Go>
					<div className={styles.rating}>
						<IconStar size={18} />
						<h5 style={{ marginTop: '2px' }}>{campsite.rating}</h5>
					</div>
				</div>
				<h5 style={{ color: '#7b7b7b' }}>{campsite.location.receptionAddress.city}</h5>
				<div className={styles.price}>
					<h4>{`$${campsite.pricePerNight} `}</h4>
					<h5 style={{ color: '#7b7b7b' }}>per night</h5>
				</div>
			</div>
		</div>
	);
};
