import { CampsiteImages } from '@components/CampsiteImages';
import { Container } from '@components/Container';
import Button from '@components/Forms/Button';
import { IconButton } from '@components/Forms/IconButton';
import { Header } from '@components/Header';
import { IconBackArrow, IconLocation, IconMap } from '@components/Icons';
import ReadMore from '@components/ReadMore';
import StarRating from '@components/StarRating';
import { CampsiteProfileAttributes } from '@components/campsites/CampsiteProfileAttributes';
import { CheckinType } from '@components/campsites/CheckinType';
import { HostedBy } from '@components/campsites/HostedBy';
import { CampsiteReviews } from '@components/reviews/CampsiteReviews';
import { AuthContext } from '@context/authContext';
import { CampsiteContext } from '@context/campsiteContext';
import { TripContext } from '@context/tripContext';
import { useAddTrip } from '@routes/useAddTrip';
import { useGetCampsite } from '@routes/useGetCampsite';
import { GoTo } from '@utils/GoTo';
import { createNewTrip } from '@utils/createNewTrip';
import { renderCoordinates } from '@utils/renderCoordinations';
import { GetServerSideProps } from 'next';
import { useContext } from 'react';
import withAuth from '../withAuth';
import styles from './campsiteProfile.module.css';
interface PostPageProps {
	id: string;
}

const Campsite: React.FC<PostPageProps> = ({ id }) => {
	const { campsite, isLoading } = useGetCampsite(id);
	const { addTrip, isLoading: addCampsiteLoading, isSuccess } = useAddTrip();
	const { trips, setTrips } = useContext(TripContext);
	const { user } = useContext(AuthContext);
	const { updateCampsite } = useContext(CampsiteContext);
	const receptionAddress = campsite?.location?.receptionAddress;

	const BookButton = () => {
		return (
			<Button onClick={handleBook} color="primary" fill="solid" size="small">
				Book
			</Button>
		);
	};

	const handleBook = async () => {
		if (campsite) {
			const newTrip = createNewTrip(user);
			try {
				const { response, campsite: updatedCampsite } = await addTrip({
					...newTrip,
					campsite: campsite._id as string
				});

				if (updatedCampsite) {
					updateCampsite(updatedCampsite);
				}

				if (response.success) {
					setTrips([newTrip, ...trips]);
					GoTo(`/campsite/book/${newTrip?._id}`);
				} else {
					console.error('Error booking trip:', response.message);
				}
			} catch (error) {
				console.error('Error booking trip:', error instanceof Error ? error.message : 'Unknown error');
			}
		}
	};

	return (
		<>
			<Header
				title="logo"
				left={<IconButton icon={<IconBackArrow />} onClick={() => history.go(-1)} />}
				right={<BookButton />}
			/>

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
											<div>{campsite?.reviewsCount} reviews</div>
										</div>
										<div className={styles.infoLine}>
											<div className={styles.iconContainer}>
												<IconMap size={18} />
											</div>
											{campsite?.location?.coordinates &&
												renderCoordinates(
													campsite.location.coordinates.lat,
													campsite.location.coordinates.lng
												)}
										</div>
										{receptionAddress && (
											<div className={styles.infoLine}>
												<div className={styles.iconContainer}>
													<IconLocation size={18} />
												</div>
												<div className={styles.addressText}>
													Reception: {receptionAddress.address1}, {receptionAddress.city},{' '}
													{campsite?.location?.state} {receptionAddress.postalCode}
												</div>
											</div>
										)}
									</div>
								</div>

								<Button onClick={handleBook} color="primary" fill="solid" size="default" expand="block">
									Request to book
								</Button>
								<div style={{ height: '20px' }} />
								<hr />
								<div className={styles.section}>
									<HostedBy campsite={campsite} />
								</div>
								<hr />
								<div className={styles.section}>
									<ReadMore
										text={campsite?.description || ''}
										textColor="var(--neutral700)"
										expandText="Show more >"
										collapseText="Show less <"
									/>
								</div>
								<hr />
								<div className={styles.section}>
									<CheckinType campsite={campsite} />
								</div>
								<hr />
								{campsite?.attributes?.feature && campsite.attributes.feature.length > 0 && (
									<>
										<div className={styles.section}>
											<CampsiteProfileAttributes campsite={campsite} attributeType="feature" />
										</div>
										<hr />
									</>
								)}
								{campsite?.attributes?.amenity && campsite.attributes.amenity.length > 0 && (
									<>
										<div className={styles.section}>
											<CampsiteProfileAttributes campsite={campsite} attributeType="amenity" />
										</div>
										<hr />
									</>
								)}
								{campsite?.attributes?.permitted && campsite.attributes.permitted.length > 0 && (
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
