import classNames from 'classnames';
import { FC } from 'react';
import styles from './FeedSearchButton.module.css';
import { IconFilter, IconSearch } from './Icons';

export const FeedSearchButton: FC = () => {
	return (
		<div className={styles.FeedSearchButtonContainer}>
			<div className={styles.FeedSearchButtonContent}>
				<div>
					<IconSearch />
				</div>
				<div className={classNames(styles.label, 'h5-bold')}>Find a campsite</div>
				<div className={styles.FilterButton}>
					<IconFilter size={20} />
				</div>
			</div>
		</div>
	);
};
