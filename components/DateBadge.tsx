// eslint-disable-next-line css-modules/no-unused-class
import { TripDateBadgeOutput } from '../util/tripCalendarDateBadge';
import styles from './DateBadge.module.css';
import { DotIndicator } from './DotIndicator';
export const DateBadge: React.FC<{ tripDateBadge: TripDateBadgeOutput }> = ({ tripDateBadge }) => {
	return (
		<>
			{tripDateBadge && (
				<div className={styles.tripBadgeContainer}>
					<div className={styles.tripDotIndicator}>
						<DotIndicator />
					</div>
					<div>
						<div className={styles.month}>{tripDateBadge.month}</div>
						<div className={styles.day}>{tripDateBadge.day}</div>
						<div className={styles.dayOfWeek}>{tripDateBadge.dayOfWeek}</div>
					</div>
				</div>
			)}
		</>
	);
};
