import React from 'react';
import { Review } from '../model/review';
import { useGetUser } from '../routes/useGetUser';
import styles from './ModalCampsiteReview.module.css';
import { ProfilePhoto } from './ProfilePhoto';
import StarRating from './StarRating';

interface ReviewProps {
	review: Review;
}

export const ModalCampsiteReview: React.FC<ReviewProps> = ({ review }) => {
	const { user, isLoading } = useGetUser(review.author);

	return (
		<div className={styles.modalContainer}>
			<div className={styles.modalRating}>
				<ProfilePhoto size={45} user={user} />
				<div>
					<div className={styles.topLine}>
						<div className="medium">{user?.username}</div>
						<div>•</div>
						<StarRating withDot={true} rating={review.rating} />
					</div>
					<div>{review.created_at}</div>
				</div>
			</div>
			<div>{review.review}</div>
		</div>
	);
};
