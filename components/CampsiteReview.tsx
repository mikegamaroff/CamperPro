import { dateSmall } from '@utils/dateTime';
import React, { useEffect, useRef, useState } from 'react';
import useModal from '../hooks/useModal';
import { Review } from '../model/review';
import { useGetUser } from '../routes/useGetUser';
import styles from './CampsiteReview.module.css';
import { ProfilePhoto } from './ProfilePhoto';
import StarRating from './StarRating';

interface ReviewProps {
	review: Review;
}

export const CampsiteReview: React.FC<ReviewProps> = ({ review }) => {
	const { user, isLoading } = useGetUser(review.author);
	const textRef = useRef<HTMLDivElement | null>(null);
	const [isTruncated, setIsTruncated] = useState(false);
	const [button, setButton] = useState(false);

	const FullReviewModal = () => {
		return (
			<div className={styles.modalContainer}>
				<div className={styles.modalRating}>
					<ProfilePhoto size={50} user={user} />
					<div className={styles.modalUsername}>
						<StarRating withDot={true} rating={review.rating} />
						<div>{dateSmall(review.created_at)}</div>
					</div>
				</div>
				<p>{review.review}</p>
			</div>
		);
	};

	const cancelModalReview = () => {
		console.log('Canceled');
		dismissModalReview();
	};

	const { presentModal: presentModalReview, dismissModal: dismissModalReview } = useModal({
		onCancel: cancelModalReview,
		title: `${user?.username}'s review`,
		component: <FullReviewModal />
	});

	useEffect(() => {
		if (textRef.current) {
			const el: HTMLDivElement = textRef.current;
			el.style.webkitLineClamp = isTruncated ? '2' : 'unset';

			const lineHeightPixels = parseFloat(getComputedStyle(el).lineHeight);
			const lines = el.scrollHeight / lineHeightPixels;

			if (lines > 3) {
				setIsTruncated(true);
				setButton(true);
			}
		}
	}, [review, isTruncated, button, textRef]);

	return (
		<div className={styles.container}>
			<div className={styles.review}>
				<div className={styles.rating}>
					<ProfilePhoto size={50} user={user} />
					<div className={styles.username}>
						<h5 className="medium">{user?.username}</h5>
						<StarRating withDot={true} rating={review.rating} />
					</div>
				</div>
				<div ref={textRef} className={styles.text}>
					{review.review}
				</div>
			</div>
			{button && (
				<div onClick={presentModalReview} className="medium">
					Show more {'>'}
				</div>
			)}
		</div>
	);
};
