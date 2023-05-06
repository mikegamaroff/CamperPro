import Image from 'next/image';
import CamprIcon from '../assets/logoIcon.svg';

interface SiteIconType {
	size?: number;
	rounded?: boolean;
}

export const SiteIcon: React.FC<SiteIconType> = ({ size, rounded }) => {
	const IconStyle = {
		width: size || 30,
		height: size || 30,
		borderRadius: rounded ? '100%' : 'inherit'
	};

	return (
		<>
			<Image style={IconStyle} src={CamprIcon} alt="Campr" width={size || 30} height={size || 30} />
		</>
	);
};
