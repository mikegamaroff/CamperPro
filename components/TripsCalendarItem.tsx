import { formatLocalDate } from '@model/date';
import classNames from 'classnames';
// styles
import Image from 'next/image';
import styles from './TripsCalendarItem.module.css';
// eslint-disable-next-line css-modules/no-unused-class
import { Campsite } from '@model/campsite';
import { TripDateBadgeOutput } from '../util/tripCalendarDateBadge';
import { DateBadge } from './DateBadge';
import { Go } from './Go';

export const TripsCalendarItem: React.FC<{
	campsite: Campsite;
	lastItem: boolean;
	tripDateBadge: TripDateBadgeOutput;
}> = ({ campsite, tripDateBadge, lastItem }) => {
	const campsiteImage = `/api/images/${campsite?.images?.[0].id}.${campsite?.images?.[0].contentType.split('/')[1]}`;
	return (
		<>
			{campsite && (
				<Go href={`/campsite/${campsite._id}`}>
					<div className={styles.outer}>
						<div className={styles.dateContainer}>
							<DateBadge tripDateBadge={tripDateBadge} />
						</div>
						<div className={classNames(styles.container, lastItem && styles.lastItem)}>
							<div>
								<div className={styles.title}>{campsite?.title}</div>
								<div className={styles.description}>{campsite?.description}</div>
							</div>
							<div className={styles.time}>{formatLocalDate(campsite.created_at)}</div>
						</div>
						<div className={classNames(styles.tripImageContainer, lastItem && styles.lastItem)}>
							<div className={styles.tripImage}>
								<Image src={campsiteImage} alt="Campr" fill style={{ objectFit: 'cover' }} />
							</div>
						</div>
					</div>
				</Go>
			)}
		</>
	);
};
