import { GetServerSideProps } from 'next';

import { CampsiteImages } from '../../components/CampsiteImages';
import { CampsiteReviews } from '../../components/CampsiteReviews';
import { Container } from '../../components/Container';
import { IconButton } from '../../components/Forms/IconButton';
import { Header } from '../../components/Header';
import { IconBackArrow, IconLocation, IconMap } from '../../components/Icons';
import StarRating from '../../components/StarRating';
import { CampsiteProfileAttributes } from '../../components/campsites/CampsiteProfileAttributes';
import { CheckinType } from '../../components/campsites/CheckinType';
import { HostedBy } from '../../components/campsites/HostedBy';
import { useGetCampsite } from '../../routes/useGetCampsite';
import withAuth from '../withAuth';
import styles from './campsiteProfile.module.css';
interface PostPageProps {
	id: string;
}

const Campsite: React.FC<PostPageProps> = ({ id }) => {
	const { campsite, isLoading } = useGetCampsite(id);

	const receptionAddress = campsite?.location.receptionAddress;

	return (
		<>
			<Header title="logo" left={<IconButton icon={<IconBackArrow />} onClick={() => history.go(-1)} />} />

			<Container scroll>
				<>
					{campsite && (
						<>
							<CampsiteImages campsite={campsite} />
							<div className="contentWrapper">
								<div className={styles.section}>
									<h2 className="bold">{campsite?.title}</h2>

									<div className={styles.info}>
										<div className={styles.infoLine}>
											{campsite.rating && (
												<div>
													<StarRating rating={campsite?.rating} />
												</div>
											)}
											<div className={styles.dot}>•</div>
											<div># reviews</div>
										</div>
										<div className={styles.infoLine}>
											<div className={styles.iconContainer}>
												<IconMap size={18} />
											</div>
											<div>
												{campsite?.location.coordinates.lat},{' '}
												{campsite?.location.coordinates.lng}
											</div>
										</div>
										{receptionAddress && (
											<div className={styles.infoLine}>
												<div className={styles.iconContainer}>
													<IconLocation size={18} />
												</div>
												<div>
													Reception: {receptionAddress.address1}, {receptionAddress.city},{' '}
													{campsite?.location.state} {receptionAddress.postalCode}
												</div>
											</div>
										)}
									</div>
								</div>
								<hr />
								<div className={styles.section}>
									<HostedBy campsite={campsite} />
								</div>
								<hr />
								<div className={styles.section}>
									<CheckinType campsite={campsite} />
								</div>
								<hr />
								{campsite.attributes.feature && campsite.attributes.feature.length > 0 && (
									<>
										<div className={styles.section}>
											<CampsiteProfileAttributes campsite={campsite} attributeType="feature" />
										</div>
										<hr />
									</>
								)}
								{campsite.attributes.amenity && campsite.attributes.amenity.length > 0 && (
									<>
										<div className={styles.section}>
											<CampsiteProfileAttributes campsite={campsite} attributeType="amenity" />
										</div>
										<hr />
									</>
								)}
								{campsite.attributes.permitted && campsite.attributes.permitted.length > 0 && (
									<>
										<div className={styles.section}>
											<CampsiteProfileAttributes campsite={campsite} attributeType="permitted" />
										</div>
										<hr />
									</>
								)}
								<>
									<div className={styles.section}>
										<CampsiteReviews campsite={campsite} />
									</div>
									<hr />
								</>
							</div>
						</>
					)}
				</>
			</Container>
		</>
	);
};

export const getServerSideProps: GetServerSideProps = async context => {
	const { params } = context;

	// Ensure that the id param is a string before we pass it as a prop
	const id = typeof params?.id === 'string' ? params.id : '';

	return {
		props: {
			id
		}
	};
};
export default withAuth(Campsite);
