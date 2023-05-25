import Image from 'next/image';
import React from 'react';
import { Campsite } from '../../model/campsite';
import { useGetUser } from '../../routes/useGetUser';
import styles from './HostedBy.module.css';

interface HostedByProps {
	campsite: Campsite;
}

export const HostedBy: React.FC<HostedByProps> = ({ campsite }) => {
	const { user, isLoading } = useGetUser(campsite.author);

	const image = user?.images?.[0];
	return (
		<div className={styles.hostedByContainer}>
			<div className={styles.hostedBy}>
				<div className={styles.host}>
					<h3 className="bold">Hosted by:</h3>
					<h5>{user?.first_name + ' ' + user?.last_name}</h5>
				</div>
				<div className={styles.profile}>
					<>
						<Image
							src={`/api/images/${image?.id}.${image?.contentType.split('/')[1]}`}
							alt="Campsite Image"
							width={60}
							height={60}
						/>
					</>
				</div>
			</div>
			<div className={styles.infoLine}>
				<div>{campsite?.capacity.numberOfTentSites} tent sites</div>
				<div className={styles.smallDot} />
				<div>{campsite?.capacity.acreage} acres</div>
			</div>
		</div>
	);
};
