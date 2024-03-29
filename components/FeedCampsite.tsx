import classNames from 'classnames';
import { useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { CampsiteContext } from '../context/campsiteContext';
import { Campsite } from '../model/campsite';
import { CampsiteImages } from './CampsiteImages';
import styles from './FeedCampsite.module.css';
import { Go } from './Go';
import { IconChevronForward, IconLocation, IconStar } from './Icons';
import { UploadImageButton } from './UploadImageButton';

export const FeedCampsite: React.FC<{ campsite: Campsite }> = ({ campsite }) => {
	const { updateCampsite } = useContext(CampsiteContext);

	return (
		<div className={styles.feedCampsite}>
			<div className={styles.images}>
				<CampsiteImages campsite={campsite} />
			</div>
			<div className={styles.uploadImage}>
				<UploadImageButton<Campsite> documentId={campsite?._id} key={uuidv4()} onSuccess={updateCampsite} />
			</div>
			<Go href={`/campsite/${campsite._id}`}>
				<>
					<div className={styles.campsiteInfo}>
						<div className={styles.titleAndRating}>
							<h5 className="bold">{campsite.title}</h5>
							<div className={classNames(styles.rating, 'body')}>
								<IconStar size={18} />
								<div>{campsite.rating}</div>
							</div>
						</div>
						<div className={styles.location}>
							<IconLocation size={13} />
							<div className="body">
								{campsite?.location?.nearestTown + ', ' + campsite?.location?.state}
							</div>
						</div>
						<div className={styles.titleAndRating}>
							<div className={classNames(styles.price, 'body')}>
								<span className="bold">{`$${campsite.pricePerNight} `}</span>
								<span className={styles.greyText}>per night</span>
							</div>
							<div className={styles.viewDetail}>
								<span className="medium">Details</span>
								<IconChevronForward size={15} />
							</div>
						</div>
					</div>
				</>
			</Go>
		</div>
	);
};
