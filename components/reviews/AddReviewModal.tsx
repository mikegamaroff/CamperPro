import { Container } from '@components/Container';
import { FormTextarea } from '@components/Forms/FormTextarea';
import { IconStar } from '@components/Icons';
import { ProfilePhoto } from '@components/ProfilePhoto';
import { AuthContext } from '@context/authContext';
import { CampsiteContext } from '@context/campsiteContext';
import { ReviewContext } from '@context/reviewContext';
import { useFormValues } from '@hooks/useFormValues';
import { Campsite } from '@model/campsite';
import { objectEquals } from '@model/model';
import { EmptyNewReview, Review } from '@model/review';
import { useAddReview } from '@routes/useAddReview';
import { AddReviewRules } from 'formConfigs/addReviewConfig';
import { ChangeEvent, useContext, useMemo, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import styles from './AddReviewModal.module.css';

export const AddReviewModal: React.FC<{
	campsite: Campsite;
	dismissNewReview: () => void;
}> = ({ campsite, dismissNewReview }) => {
	const [reviewText, setReviewText] = useState('');
	const reviewTextNoSpace = reviewText.replace(/\s/g, '');
	const { addReview, isLoading: addCampsiteLoading, isError, isSuccess } = useAddReview();
	const { updateCampsite } = useContext(CampsiteContext);
	const { reviews, setReviews } = useContext(ReviewContext);
	const { user } = useContext(AuthContext);

	const newReview: Review = useMemo(
		() => ({
			...EmptyNewReview,
			_id: 'review:' + uuidv4(),
			campsite: campsite._id as string,
			review: `${reviewText}`,
			author: user?._id as string
		}),
		[reviewText, user]
	);

	const {
		setValues,
		formValues,
		stateDataObject: updatedReview
	} = useFormValues<Review>(AddReviewRules, newReview, objectEquals);

	const handleTextChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
		setReviewText(event.target.value);
	};

	const disableButton = !(Number(formValues?.rating?.value) > 0 && formValues?.review?.value);
	const currentDate = new Date();
	const dateString = currentDate.toISOString();
	const dateObj = new Date(dateString);
	const formattedDate = dateObj.toLocaleDateString('en-US', {
		month: 'long',
		day: 'numeric',
		year: 'numeric'
	});

	const handleAddReview = async () => {
		if (updatedReview) {
			try {
				const { response, campsite } = await addReview(updatedReview);

				if (campsite) {
					updateCampsite(campsite);
				}

				if (response.success) {
					setReviews([updatedReview, ...reviews]);
					dismissNewReview();
					console.log(response);
				} else {
					console.error('Error adding campsite:', response.message);
				}
			} catch (error) {
				console.error('Error adding campsite:', error instanceof Error ? error.message : 'Unknown error');
			}
		}
	};
	const handleRating = (rating: number) => {
		setValues({ rating });
	};

	return (
		<Container scroll hidetabs shelfHeight={40}>
			<>
				<div className={styles.addReviewContainer}>
					<h5 className={styles.addReviewText}>How was your camping trip at {campsite.title}?</h5>
					{formValues && formValues.rating && (
						<div className={styles.addReviewRating}>
							<div
								onClick={() => handleRating(1)}
								style={
									formValues.rating.value >= 1
										? { color: 'var(--primary)' }
										: { color: 'var(--neutral500)' }
								}
							>
								<IconStar size={50} />
							</div>
							<div
								onClick={() => handleRating(2)}
								style={
									formValues.rating.value >= 2
										? { color: 'var(--primary)' }
										: { color: 'var(--neutral500)' }
								}
							>
								<IconStar size={50} />
							</div>
							<div
								onClick={() => handleRating(3)}
								style={
									formValues.rating.value >= 3
										? { color: 'var(--primary)' }
										: { color: 'var(--neutral500)' }
								}
							>
								<IconStar size={50} />
							</div>
							<div
								onClick={() => handleRating(4)}
								style={
									formValues.rating.value >= 4
										? { color: 'var(--primary)' }
										: { color: 'var(--neutral500)' }
								}
							>
								<IconStar size={50} />
							</div>
							<div
								onClick={() => handleRating(5)}
								style={
									formValues.rating.value === 5
										? { color: 'var(--primary)' }
										: { color: 'var(--neutral500)' }
								}
							>
								<IconStar size={50} />
							</div>
						</div>
					)}
					<hr />
					<div className={styles.addReviewInputContainer}>
						<div className={styles.addReviewUser}>
							<ProfilePhoto size={45} user={user} />
							<div>
								<div className="medium">{user?.username}</div>
								<div className="caption">{formattedDate}</div>
							</div>
						</div>
						{formValues && (
							<FormTextarea
								setValues={setValues}
								field={formValues?.review}
								id="review"
								label="Add a review"
								placeholder="Describe your experience"
							/>
						)}
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
