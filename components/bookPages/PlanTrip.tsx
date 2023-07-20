// eslint-disable-next-line css-modules/no-unused-class
import { Campsite } from '@model/campsite';
import defaultImage from 'assets/defaultCampsite.png';
import classNames from 'classnames';
import Image from 'next/image';
import styles from './PlanTrip.module.css';
export const PlanTrip: React.FC<{
	campsite?: Campsite;
}> = ({ campsite }) => {
	const image = campsite?.images?.[0];
	return (
		<div key={'stage1'} className={styles.container}>
			<h1 className="bold">Plan your trip</h1>
			<div className="space10" />
			<p>Provide the details of your visit and send your request to the campsite owner</p>
			<div className="space10" />
			<div className="card">
				<div className={styles.campsitePreview}>
					<div className={styles.campsiteImage}>
						<Image
							src={image ? `/api/images/${image?.id}.${image?.contentType.split('/')[1]}` : defaultImage}
							alt="Campsite Image"
							fill
							style={{ objectFit: 'cover' }}
						/>
					</div>
					<div className={styles.camspiteInfo}>
						<div>Where</div>
						<h5 className={styles.campsiteTitle}>{campsite?.title}</h5>
						<div className="space10"></div>
						<div className={classNames('callout', styles.campsiteDescription)}>
							A nice campsite in the picturesque rocky mountains
						</div>
					</div>
				</div>
			</div>
			<div className="space20" />
			<div className="card"></div>
		</div>
	);
};
