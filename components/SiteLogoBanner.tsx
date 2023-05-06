import Image from 'next/image';
import CamprLogo from '../assets/logo.svg';
// eslint-disable-next-line css-modules/no-unused-class
import sharedStyles from '../styles/shared.module.css';

interface SiteIconType {
	subtitle?: string;
	small?: boolean;
}

export const SiteLogoBanner: React.FC<SiteIconType> = ({ subtitle, small }) => {
	return (
		<div className={sharedStyles.pageProfileHeader}>
			<Image src={CamprLogo} alt="Campr" width={small ? 140 : 200} height={small ? 140 : 200} />
			{subtitle || (
				<p className={sharedStyles.pageSubtitle}>
					Find premium campsites
					<br />
					off the beaten track
				</p>
			)}
		</div>
	);
};
