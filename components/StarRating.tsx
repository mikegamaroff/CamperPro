import React from 'react';
import { IconTripsSolid } from './Icons';
import styles from './StarRating.module.css';
type StarRatingProps = {
	rating: number;
	withNumber?: boolean;
	withDot?: boolean;
};

const StarRating: React.FC<StarRatingProps> = ({ rating, withNumber = true, withDot = false }) => {
	const starCount = 5;

	const roundedRating = Number(rating.toFixed(2));

	const renderStar = (key: number) => {
		return <IconTripsSolid key={key} size={17} />;
	};

	const starMaskStyle = {
		width: `${(roundedRating / starCount) * 100}%`
	};

	return (
		<div className={styles.ratingContainer}>
			<div className={styles.starRating}>
				<div className={styles.starColor} style={starMaskStyle}>
					{[...Array(starCount)].map((_, index) => renderStar(index))}
				</div>
				<div className={styles.starWrapper}>{[...Array(starCount)].map((_, index) => renderStar(index))}</div>
			</div>
			{withDot && <div>•</div>}
			{withNumber && <div className="medium">{roundedRating}</div>}
		</div>
	);
};

export default StarRating;
