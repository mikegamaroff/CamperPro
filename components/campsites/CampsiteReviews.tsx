import { Container } from '@components/Container';
import { ProfilePhoto } from '@components/ProfilePhoto';
import React, { ChangeEvent, useContext, useState } from 'react';
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
	const [addRating, setAddRating] = useState<number>(0);
	const currentDate = new Date();
	var dateString = currentDate.toISOString();
	var dateObj = new Date(dateString);
	var formattedDate = dateObj.toLocaleDateString('en-US', {
		month: 'long',
		day: 'numeric',
		year: 'numeric'
	});
	const [reviewText, setReviewText] = useState('');
	const reviewTextNoSpace = reviewText.replace(/\s/g, '');
	const disableButton = addRating > 0 && reviewTextNoSpace.length > 0 ? false : true;

	const handleTextChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
		setReviewText(event.target.value);
	};

	const handleAddReview = async () => {
		const newId = uuidv4(); // replace this with your ID generation logic
		const newReview: Review = {
			...EmptyNewReview,
			_id: 'review:' + newId,
			campsite: campsite._id as string,
			rating: addRating,
			title: 'Test Review',
			review: `${reviewText}`,
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

	const AddReviewModal = () => {
		const handleRating = (rating: number) => {
			setAddRating(rating);
		};
		return (
			<Container scroll hidetabs shelfHeight={40}>
				<>
					<div className={styles.addReviewContainer}>
						<h5 className={styles.addReviewText}>How was your camping trip at {campsite.title}?</h5>
						<div className={styles.addReviewRating}>
							<div
								onClick={() => handleRating(1)}
								style={addRating >= 1 ? { color: 'var(--primary)' } : { color: 'var(--neutral500)' }}
							>
								<IconStar size={50} />
							</div>
							<div
								onClick={() => handleRating(2)}
								style={addRating >= 2 ? { color: 'var(--primary)' } : { color: 'var(--neutral500)' }}
							>
								<IconStar size={50} />
							</div>
							<div
								onClick={() => handleRating(3)}
								style={addRating >= 3 ? { color: 'var(--primary)' } : { color: 'var(--neutral500)' }}
							>
								<IconStar size={50} />
							</div>
							<div
								onClick={() => handleRating(4)}
								style={addRating >= 4 ? { color: 'var(--primary)' } : { color: 'var(--neutral500)' }}
							>
								<IconStar size={50} />
							</div>
							<div
								onClick={() => handleRating(5)}
								style={addRating === 5 ? { color: 'var(--primary)' } : { color: 'var(--neutral500)' }}
							>
								<IconStar size={50} />
							</div>
						</div>
						<hr />
						<div className={styles.addReviewInputContainer}>
							<div className={styles.addReviewUser}>
								<ProfilePhoto size={45} user={user} />
								<div>
									<div className="medium">{user?.username}</div>
									<div className="caption">{formattedDate}</div>
								</div>
							</div>
							<textarea
								value={reviewText}
								onChange={handleTextChange}
								placeholder="Describe your experience"
								className={styles.addReviewInput}
							/>
						</div>
						<button
							disabled={disableButton}
							onClick={handleAddReview}
							className={styles.submitButton}
							style={
								!disableButton
									? { backgroundColor: 'var(--primary)' }
									: { backgroundColor: 'var(--primary300)' }
							}
						>
							Submit review
						</button>
					</div>
				</>
			</Container>
		);
	};

	const AllReviewsModal = () => {
		return (
			<Container scroll hidetabs shelfHeight={40}>
				<>
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
				</>
			</Container>
		);
	};

	const cancelModalSearch = () => {
		console.log('Canceled');
		dismissModal();
	};

	const { Modal, presentModal, dismissModal } = useModal({
		onCancel: cancelModalSearch,
		component: <AllReviewsModal />,
		title: 'Campsite Reviews'
	});

	const newCancelModalSearch = () => {
		console.log('Canceled');
		newDismissModal();
	};

	const {
		Modal: newModal,
		presentModal: newPresentModal,
		dismissModal: newDismissModal
	} = useModal({
		onCancel: newCancelModalSearch,
		component: <AddReviewModal />,
		title: 'Leave a review'
	});

	return (
		<div className={styles.container}>
			{Modal}
			{newModal}
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
					<div onClick={presentModal} className={styles.seeAllButton}>
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
					<div onClick={newPresentModal} className={styles.reviewButton}>
						<div className="medium">Leave a review</div>
					</div>
				</div>
			)}
			{reviews.length < 1 && (
				<div className={styles.noReviewsContainer}>
					<h4 className="bold">Reviews</h4>
					<div className={styles.largeButtonContainer}>
						<div onClick={newPresentModal} className={styles.largeButton}>
							<div className="medium">Leave the first review</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};
