import { User } from '@model/user';
import Image from 'next/image';
import genericImage from '../assets/generic-profile.png';
import styles from './ProfilePic.module.css';
interface ProfilePicProps {
	user?: User;
	size?: number;
	rounded?: boolean;
}

export const ProfilePic = ({ user, size = 30, rounded = true }: ProfilePicProps) => {
	const IconStyle = {
		width: size,
		height: size,
		borderRadius: rounded ? '100%' : 'inherit'
	};

	const image =
		user?.images && user?.images.length > 0
			? `/api/images/${user?.images[0].id}.${user?.images[0].contentType.split('/')[1]}`
			: genericImage;

	return (
		<>
			{user?.images && (
				<div style={{ ...IconStyle }} className={styles.profilePicContainer}>
					<Image src={image} alt="Campr" fill style={{ objectFit: 'cover' }} />
				</div>
			)}
		</>
	);
};
