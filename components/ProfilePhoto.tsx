import Image from 'next/image';
import React from 'react';
import { User } from '../model/user';

interface ProfilePhotoProps {
	user: User | undefined;
	size: number;
}

export const ProfilePhoto: React.FC<ProfilePhotoProps> = ({ user, size }) => {
	const image = user?.images?.[0];

	return (
		<Image
			src={`/api/images/${image?.id}.${image?.contentType.split('/')[1]}`}
			alt="Campsite Image"
			height={size}
			width={size}
			style={{ objectFit: 'cover', borderRadius: '100%' }}
		/>
	);
};
