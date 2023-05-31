import React from 'react';
import { IconStar } from './Icons';
import styles from './StarRating.module.css';
type StarRatingProps = {
	rating: number;
};

const StarRating: React.FC<StarRatingProps> = ({ rating }) => {
	const starCount = 5;

	const renderStar = (key: number) => {
		return <IconStar key={key} size={17} />;
	};

	const starMaskStyle = {
		width: `${(rating / starCount) * 100}%`
	};

	return (
		<div className={styles.starRating}>
			<div className={styles.starColor} style={starMaskStyle}>
				{[...Array(starCount)].map((_, index) => renderStar(index))}
			</div>
			<div className={styles.starWrapper}>{[...Array(starCount)].map((_, index) => renderStar(index))}</div>
		</div>
	);
};

export default StarRating;
