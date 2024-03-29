import { dateSmall } from '@model/date';
import React from 'react';
import { Review } from '../model/review';
import { useGetUser } from '../routes/useGetUser';
import styles from './ModalCampsiteReview.module.css';
import { ProfilePhoto } from './ProfilePhoto';
import ReadMore from './ReadMore';
import StarRating from './StarRating';

interface ReviewProps {
	review: Review;
}
export const ModalCampsiteReview = React.memo<ReviewProps>(({ review }: ReviewProps) => {
	const { user, isLoading } = useGetUser(review?.author);

	return (
		<div className={styles.modalContainer}>
			{review && (
				<>
					<div className={styles.modalRating}>
						<ProfilePhoto size={45} user={user} />
						<div>
							<div className={styles.topLine}>
								<div className="medium">{user?.username}</div>
								<div>•</div>
								{review && <StarRating withDot={true} rating={review.rating} />}
							</div>
							<div>{dateSmall(review?.created_at)}</div>
						</div>
					</div>
					<ReadMore text={review.review} expandText="Show more >" collapseText="Show less <" />
				</>
			)}
		</div>
	);
});
ModalCampsiteReview.displayName = 'ModalCampsiteReview';
