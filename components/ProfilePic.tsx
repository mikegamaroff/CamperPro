import { User } from '@model/user';
import Image from 'next/image';

interface ProfilePicProps {
	user?: User;
	size?: number;
	rounded?: boolean;
}

export const ProfilePic: React.FC<ProfilePicProps> = ({ user, size = 30, rounded = true }) => {
	const IconStyle = {
		width: size,
		height: size,
		borderRadius: rounded ? '100%' : 'inherit'
	};

	return (
		<>
			{user?.images && (
				<Image
					style={IconStyle}
					src={`/api/images/${user?.images[0].id}.${user?.images[0].contentType.split('/')[1]}`}
					alt="Campr"
					width={size}
					height={size}
				/>
			)}
		</>
	);
};
