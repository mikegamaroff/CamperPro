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
import { useContext, useMemo } from 'react';
import { v4 as uuidv4 } from 'uuid';
import styles from './AddReviewModal.module.css';

export const AddReviewModal: React.FC<{
	campsite: Campsite;
	dismissNewReview: () => void;
}> = ({ campsite, dismissNewReview }) => {
	const { addReview, isLoading: addCampsiteLoading, isError, isSuccess } = useAddReview();
	const { updateCampsite } = useContext(CampsiteContext);
	const { reviews, setReviews } = useContext(ReviewContext);
	const { user } = useContext(AuthContext);

	const newReview: Review = useMemo(
		() => ({
			...EmptyNewReview,
			_id: 'review:' + uuidv4(),
			campsite: campsite._id as string,
			author: user?._id as string
		}),
		[user]
	);
	const {
		setValues,
		formValues,
		stateDataObject: updatedReview,
		formSuccess
	} = useFormValues<Review>(AddReviewRules, newReview, objectEquals);

	const disableButton = !(Number(formValues?.rating?.value) > 0 && formValues?.review?.value && formSuccess);
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

	const StarRater = ({ numberOfItems }: { numberOfItems: number }) => {
		const items = [];

		for (let i = 1; i <= numberOfItems; i++) {
			items.push(
				<div
					onClick={e => handleRating(i)}
					style={
						formValues && formValues.rating && formValues.rating.value >= i
							? { color: 'var(--primary)' }
							: { color: 'var(--neutral500)' }
					}
				>
					<IconStar size={50} />
				</div>
			);
		}

		return <div className={styles.addReviewRating}>{items}</div>;
	};

	return (
		<Container scroll hidetabs shelfHeight={40}>
			<>
				<div className={styles.addReviewContainer}>
					<h5 className={styles.addReviewText}>How was your camping trip at {campsite.title}?</h5>
					{formValues && formValues.rating && <StarRater numberOfItems={5} />}
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
