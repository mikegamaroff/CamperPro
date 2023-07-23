import { dateDiffDays } from '@model/date';
import classNames from 'classnames';
// styles
import Image from 'next/image';
import styles from './TripsCalendarItem.module.css';
// eslint-disable-next-line css-modules/no-unused-class
import { Trip } from '@model/trips';
import { useGetCampsite } from '@routes/useGetCampsite';
import { getRandomAdventureSynonym } from '@utils/getRandomAdventureName';
import { useMemo } from 'react';
import { TripDateBadgeOutput } from '../util/tripCalendarDateBadge';
import { DateBadge } from './DateBadge';
import { Go } from './Go';
import { IconPets } from './Icons';

export const TripsCalendarItem: React.FC<{
	trip: Trip;
	lastItem: boolean;
	tripDateBadge: TripDateBadgeOutput;
}> = ({ trip, tripDateBadge, lastItem }) => {
	const { campsite, isLoading } = useGetCampsite(trip.campsite);
	const randomAdventureSynonym = useMemo(() => getRandomAdventureSynonym(), []);

	const campsiteImage = `/api/images/${campsite?.images?.[0].id}.${campsite?.images?.[0].contentType.split('/')[1]}`;
	return (
		<>
			{campsite && (
				<Go href={`/campsite/${campsite._id}`}>
					<div className={styles.outer} style={{ opacity: isLoading ? 0.5 : 1 }}>
						<div className={styles.dateContainer}>
							<DateBadge tripDateBadge={tripDateBadge} />
						</div>
						<div className={classNames(styles.container, lastItem && styles.lastItem)}>
							<div>
								<div className={styles.title}>{campsite?.title}</div>
								<div className={styles.description}>{campsite?.description}</div>
							</div>
							<div className={styles.capacity}>
								{trip.capacity.adults + trip.capacity.children} campers
							</div>
							<div className={styles.time}>
								{dateDiffDays(trip.checkin, trip.checkout)} day {randomAdventureSynonym}
							</div>
						</div>

						<div className={classNames(styles.tripImageContainer, lastItem && styles.lastItem)}>
							<div className={classNames(styles.tripImage)}>
								<Image src={campsiteImage} alt="Campr" fill style={{ objectFit: 'cover' }} />
							</div>
							{trip.capacity.pets > 0 && (
								<div>
									<IconPets />
								</div>
							)}
						</div>
					</div>
				</Go>
			)}
		</>
	);
};
