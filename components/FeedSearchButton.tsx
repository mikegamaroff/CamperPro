import classNames from 'classnames';
import { FC } from 'react';
import useModal from '../hooks/useModal';
import styles from './FeedSearchButton.module.css';
import { Go } from './Go';
import { IconFilter, IconSearch } from './Icons';

export const FeedSearchButton: FC = () => {
	const SearchModalContent = () => {
		return (
			<div>
				<h2>Search</h2>
				<p>Search</p>
			</div>
		);
	};
	const confirmModalSearch = () => {
		console.log('Confirmed');
		dismissModalSearch();
	};

	const cancelModalSearch = () => {
		console.log('Canceled');
		dismissModalSearch();
	};

	const { presentModal: presentModalSearch, dismissModal: dismissModalSearch } = useModal({
		onCancel: cancelModalSearch,
		onConfirm: confirmModalSearch,
		title: 'Search',
		component: <SearchModalContent />
	});

	return (
		<div className={styles.FeedSearchButtonContainer}>
			<div onClick={presentModalSearch} className={styles.FeedSearchButtonShadow}>
				<div className={styles.FeedSearchButtonContent}>
					<div>
						<IconSearch size={25} />
					</div>
					<div className={classNames(styles.label, 'body', 'bold')}>Find a campsite</div>
					<Go href={`/feedFilters`}>
						<div className={styles.FilterButton}>
							<IconFilter size={25} />
						</div>
					</Go>
				</div>
			</div>
		</div>
	);
};
