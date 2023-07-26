import { IconStar } from '@components/Icons';
import { Campsite } from '@model/campsite';
import defaultImage from 'assets/defaultCampsite.png';
import classNames from 'classnames';
import Image from 'next/image';
import styles from './RequestToBook.module.css';
export const RequestToBook: React.FC<{
	campsite?: Campsite;
	goToNextStage: (page: number) => Promise<void>;
}> = ({ campsite, goToNextStage }) => {
	const image = campsite?.images?.[0];
	const totalPrice = campsite?.pricePerNight && campsite?.pricePerNight * 5;

	return (
		<>
			<div key={'stage2'} className={styles.container}>
				<div className={styles.preview}>
					<h1 className="bold">Request to book</h1>
					<div className={styles.campsitePreview}>
						<div className={styles.campsiteImage}>
							<Image
								src={
									image
										? `/api/images/${image?.id}.${image?.contentType.split('/')[1]}`
										: defaultImage
								}
								alt="Campsite Image"
								fill
								style={{ objectFit: 'cover' }}
							/>
						</div>
						<div className={styles.camspiteInfo}>
							<h5 className={styles.title}>{campsite?.title}</h5>
							<div className={classNames('callout', styles.description)}>
								A nice campsite in the picturesque rocky mountains
							</div>
							<div className={styles.campsiteRating}>
								<IconStar size={13} />
								<div>{campsite?.rating}</div>
							</div>
						</div>
					</div>
				</div>
				<hr />
				<div className={styles.section}>
					<div className={styles.editDetailsContainer}>
						<div className={classNames('caption', styles.editDetails)}>Edit Details</div>
					</div>
					<div className={styles.details}>
						<h5 className={styles.title}>Dates</h5>
						<div className={styles.description}>30 Oct - 4 Nov</div>
					</div>
					<div className={styles.details}>
						<h5 className={styles.title}>Guests</h5>
						<div className={styles.description}>2 adults, 2 children</div>
					</div>
				</div>
				<hr />
				<div className={styles.section}>
					<div className={styles.details}>
						<h5 className={styles.title}>Price details</h5>
						<div className={styles.priceDetails}>
							<div className={styles.description}>${campsite?.pricePerNight} x 5 nights</div>
							<h5 className={styles.totalPrice}>${totalPrice}</h5>
						</div>
					</div>
				</div>
				<hr />
			</div>
		</>
	);
};
