import { Container } from '@components/Container';
import { IconStar } from '@components/Icons';
import { ModalCampsiteReview } from '@components/ModalCampsiteReview';
import { Campsite } from '@model/campsite';
import { Review } from '@model/review';
import { Virtuoso } from 'react-virtuoso';
import styles from './AllReviewsModal.module.css';

export const AllReviewsModal: React.FC<{ campsite: Campsite; reviews: Review[] }> = ({ campsite, reviews }) => {
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
