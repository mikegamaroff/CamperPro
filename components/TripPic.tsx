import { Trip } from '@model/trips';
import Image from 'next/image';
import genericImage from '../assets/generic-profile.png';
import styles from './ProfilePic.module.css';
interface TripPicProps {
	trip?: Trip | null | undefined;
	size?: number;
}

export const TripPic = ({ trip, size = 30 }: TripPicProps) => {
	const IconStyle = {
		width: size,
		height: size
	};

	const image =
		trip?.images && trip?.images.length > 0
			? `/api/images/${trip?.images[0].id}.${trip?.images[0].contentType.split('/')[1]}`
			: genericImage;

	return (
		<>
			{trip?.images && (
				<div style={{ ...IconStyle }} className={styles.profilePicContainer}>
					<Image src={image} alt="Campr" fill style={{ objectFit: 'cover' }} />
				</div>
			)}
		</>
	);
};
