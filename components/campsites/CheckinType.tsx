import React from 'react';
import { Campsite } from '../../model/campsite';
import { IconHome, IconNote } from '../Icons';
import styles from './CheckinType.module.css';

interface CheckinTypeProps {
	campsite: Campsite;
}

export const CheckinType: React.FC<CheckinTypeProps> = ({ campsite }) => {
	const receptionCheckin = campsite.receptionCheckin;

	return (
		<div>
			{receptionCheckin ? (
				<div className={styles.checkin}>
					<IconHome size={30} />
					<div className={styles.checkinText}>
						<div className="bold">Reception check-in</div>
						<div>Meet the owner at the reception.</div>
					</div>
				</div>
			) : (
				<div className={styles.checkin}>
					<IconNote size={30} />
					<div className={styles.checkinText}>
						<div className="bold">Self check-in</div>
						<div>Check in without meeting the owner.</div>
					</div>
				</div>
			)}
		</div>
	);
};
