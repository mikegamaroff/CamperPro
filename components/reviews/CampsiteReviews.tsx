import React, { useContext } from 'react';

import { ReviewContext } from '../../context/reviewContext';
import useModal from '../../hooks/useModal';
import { Campsite } from '../../model/campsite';
import { Review } from '../../model/review';
import { useGetReviewsByCampsite } from '../../routes/useGetReviewsByCampsite';
import { CampsiteReview } from '../CampsiteReview';
import { IconStar } from '../Icons';
import { AddReviewModal } from './AddReviewModal';
import { AllReviewsModal } from './AllReviewsModal';
import styles from './CampsiteReviews.module.css';

interface CampsiteReviewsProps {
	campsite: Campsite;
}

export const CampsiteReviews: React.FC<CampsiteReviewsProps> = ({ campsite }) => {
	const { isLoading } = useGetReviewsByCampsite(campsite._id);
	const { reviews } = useContext(ReviewContext);

	const newCancelModalSearch = () => {
		console.log('Canceled');
		dismissNewReview();
		dismissAllReviews();
	};
	const {
		Modal: NewReviewModal,
		presentModal: presentNewReview,
		dismissModal: dismissNewReview
	} = useModal({
		onCancel: newCancelModalSearch,
		onConfirm: () => console.log('Modal confirmed'),
		component: <AddReviewModal campsite={campsite} dismissNewReview={newCancelModalSearch} />,
		title: 'Leave a review'
	});

	const {
		Modal: AllReviews,
		presentModal: presentAllReviews,
		dismissModal: dismissAllReviews
	} = useModal({
		onCancel: newCancelModalSearch,
		onConfirm: () => console.log('Modal confirmed'),
		component: <AllReviewsModal campsite={campsite} reviews={reviews} />,
		title: 'Leave a review'
	});
	return (
		<>
			{NewReviewModal}
			{AllReviews}
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
						<div onClick={presentAllReviews} className={styles.seeAllButton}>
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
						<div onClick={presentNewReview} className={styles.reviewButton}>
							<div className="medium">Leave a review</div>
						</div>
					</div>
				)}
				{reviews.length < 1 && (
					<div className={styles.noReviewsContainer}>
						<h4 className="bold">Reviews</h4>
						<div className={styles.largeButtonContainer}>
							<div onClick={presentNewReview} className={styles.largeButton}>
								<div className="medium">Leave the first review</div>
							</div>
						</div>
					</div>
				)}
			</div>
		</>
	);
};