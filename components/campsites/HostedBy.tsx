import React from 'react';
import { Campsite } from '../../model/campsite';
import { useGetUser } from '../../routes/useGetUser';
import { ProfilePhoto } from '../ProfilePhoto';
import styles from './HostedBy.module.css';

interface HostedByProps {
	campsite: Campsite;
}

export const HostedBy: React.FC<HostedByProps> = ({ campsite }) => {
	const { user, isLoading } = useGetUser(campsite.author);

	return (
		<div className={styles.hostedByContainer}>
			<div className={styles.hostedBy}>
				<div className={styles.host}>
					<h3 className="bold">Hosted by:</h3>
					<h5>{user?.first_name + ' ' + user?.last_name}</h5>
				</div>
				<ProfilePhoto user={user} size={60} />
			</div>
			<div className={styles.infoLine}>
				<div>{campsite?.capacity.numberOfTentSites} tent sites</div>
				<div className={styles.smallDot} />
				<div>{campsite?.capacity.acreage} acres</div>
			</div>
		</div>
	);
};
