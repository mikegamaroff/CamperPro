import { GetServerSideProps } from 'next';
import { useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { CampsiteImages } from '../../components/CampsiteImages';
import { Container } from '../../components/Container';
import Button from '../../components/Forms/Button';
import { IconButton } from '../../components/Forms/IconButton';
import { Header } from '../../components/Header';
import { IconBackArrow, IconLocation, IconMap, IconStar } from '../../components/Icons';
import { CampsiteProfileAttributes } from '../../components/campsites/CampsiteProfileAttributes';
import { CheckinType } from '../../components/campsites/CheckinType';
import { HostedBy } from '../../components/campsites/HostedBy';
import { AuthContext } from '../../context/authContext';
import { EmptyNewReview, Review } from '../../model/review';
import { useAddReview } from '../../routes/useAddReview';
import { useGetCampsite } from '../../routes/useGetCampsite';
import withAuth from '../withAuth';
import styles from './campsiteProfile.module.css';
interface PostPageProps {
	id: string;
}

const Campsite: React.FC<PostPageProps> = ({ id }) => {
	const { campsite, isLoading } = useGetCampsite(id);
	const { addReview, isLoading: addCampsiteLoading, isError, isSuccess } = useAddReview();
	const { authUser } = useContext(AuthContext); // Access user and status from the AuthContext
	const receptionAddress = campsite?.location.receptionAddress;
	const handleAddReview = async () => {
		const newId = uuidv4(); // replace this with your ID generation logic
		const newReview: Review = {
			...EmptyNewReview,
			_id: 'review:' + newId,
			campsite: id,
			rating: 0,
			title: 'Test Review',
			review: 'Here is my nice review that should be read',
			author: authUser?.id as string
		};

		try {
			const response = await addReview(newReview);
			if (response.success) {
				console.log(response);
			} else {
				console.error('Error adding campsite:', response.message);
			}
		} catch (error) {
			console.error('Error adding campsite:', error instanceof Error ? error.message : 'Unknown error');
		}
	};
	return (
		<>
			<Header title="logo" left={<IconButton icon={<IconBackArrow />} onClick={() => history.go(-1)} />} />

			<Container scroll>
				<>
					<CampsiteImages campsite={campsite} />
					<div className="contentWrapper">
						<div className={styles.section}>
							<h2 className="bold">{campsite?.title}</h2>
							<Button onClick={handleAddReview}>Add Review</Button>
							<div className={styles.info}>
								<div className={styles.infoLine}>
									<div className={styles.iconContainer}>
										<IconStar size={18} />
									</div>
									<div>{campsite?.rating}</div>
									<div className={styles.dot}>•</div>
									<div># reviews</div>
								</div>
								<div className={styles.infoLine}>
									<div className={styles.iconContainer}>
										<IconMap size={18} />
									</div>
									<div>
										{campsite?.location.coordinates.lat}, {campsite?.location.coordinates.lng}
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
						{campsite && (
							<>
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
							</>
						)}
					</div>
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
