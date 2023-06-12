import React, { useContext } from 'react';
import { Virtuoso } from 'react-virtuoso';
import { v4 as uuidv4 } from 'uuid';
import { AuthContext } from '../../context/authContext';
import { CampsiteContext } from '../../context/campsiteContext';
import { ReviewContext } from '../../context/reviewContext';
import useModal from '../../hooks/useModal';
import { Campsite } from '../../model/campsite';
import { EmptyNewReview, Review } from '../../model/review';
import { useAddReview } from '../../routes/useAddReview';
import { useGetReviewsByCampsite } from '../../routes/useGetReviewsByCampsite';
import { CampsiteReview } from '../CampsiteReview';
import { IconStar } from '../Icons';
import { ModalCampsiteReview } from '../ModalCampsiteReview';
import styles from './CampsiteReviews.module.css';

interface CampsiteReviewsProps {
	campsite: Campsite;
}

export const CampsiteReviews: React.FC<CampsiteReviewsProps> = ({ campsite }) => {
	const { isLoading } = useGetReviewsByCampsite(campsite._id);
	const { addReview, isLoading: addCampsiteLoading, isError, isSuccess } = useAddReview();
	const { reviews, setReviews } = useContext(ReviewContext);
	const { user } = useContext(AuthContext);
	const { updateCampsite } = useContext(CampsiteContext);

	const handleAddReview = async () => {
		const newId = uuidv4(); // replace this with your ID generation logic
		const newReview: Review = {
			...EmptyNewReview,
			_id: 'review:' + newId,
			campsite: campsite._id as string,
			rating: 1,
			title: 'Test Review',
			review: 'Here is my nice review that should be read',
			author: user?._id as string
		};

		try {
			const { response, campsite } = await addReview(newReview);

			if (campsite) {
				updateCampsite(campsite);
			}

			if (response.success) {
				setReviews([...reviews, newReview]);
				console.log(response);
			} else {
				console.error('Error adding campsite:', response.message);
			}
		} catch (error) {
			console.error('Error adding campsite:', error instanceof Error ? error.message : 'Unknown error');
		}
	};

	const AllReviewsModal = () => {
		return (
			<div className={styles.modalContainer}>
				<div className={styles.modalRating}>
					<div>
						<IconStar size={18} />
					</div>
					<h4 className="medium">{campsite?.rating}</h4>
					<div className="bold">•</div>
					<h4 className="medium">{campsite?.reviewsCount} reviews</h4>
				</div>
				<div style={{ height: '100%', paddingTop: '80px' }}>
					<Virtuoso
						totalCount={reviews.length}
						data={reviews}
						overscan={{ main: 2, reverse: 2 }}
						itemContent={(index, review) => <ModalCampsiteReview review={review} />}
					/>
				</div>
			</div>
		);
	};

	const cancelModalReviews = () => {
		console.log('Canceled');
		dismissModalReviews();
	};

	const { presentModal: presentModalReviews, dismissModal: dismissModalReviews } = useModal({
		onCancel: cancelModalReviews,
		title: '',
		component: <AllReviewsModal />
	});

	return (
		<div className={styles.container}>
			{reviews.length > 0 && (
				<div className={styles.header}>
					<div className={styles.rating}>
						<div>
							<IconStar size={18} />
						</div>
						<h4 className="medium">{campsite?.rating}</h4>
						<h3 className="bold">•</h3>
						<h4 className="medium">{campsite?.reviewsCount} reviews</h4>
					</div>
					<div onClick={presentModalReviews} className={styles.seeAllButton}>
						<div className="medium">See all</div>
					</div>
				</div>
			)}
			{reviews.length > 0 && (
				<div className={styles.reviews}>
					<div className={styles.reviewsPadding} />
					{reviews.map((review: Review, i: number) => {
						return (
							<div key={i}>
								<CampsiteReview review={review} />
							</div>
						);
					})}
					<div className={styles.reviewsPadding} />
				</div>
			)}
			{reviews.length > 0 && (
				<div className={styles.buttons}>
					<div onClick={handleAddReview} className={styles.reviewButton}>
						<div className="medium">Leave a review</div>
					</div>
				</div>
			)}
			{reviews.length < 1 && (
				<div className={styles.noReviewsContainer}>
					<h4 className="bold">Reviews</h4>
					<div className={styles.largeButtonContainer}>
						<div onClick={handleAddReview} className={styles.largeButton}>
							<div className="medium">Leave the first review</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};
