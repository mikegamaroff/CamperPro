import { CampsiteFilter } from '@model/campsite';
import classNames from 'classnames';
import { FC } from 'react';
import useModal from '../hooks/useModal';
import styles from './FeedSearchButton.module.css';
import { FilterModal } from './FilterModal';
import { IconFilter, IconSearch } from './Icons';
interface FeedSearchButtonProps {
	setSelectedFilter: (filters: CampsiteFilter) => void;
	selectedFilter: CampsiteFilter;
}

export const FeedSearchButton: FC<FeedSearchButtonProps> = ({ setSelectedFilter, selectedFilter }) => {
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
	const confirmModalFilter = () => {
		console.log('Confirmed');
		dismissModalFilter();
	};

	const cancelModalFilter = () => {
		console.log('Canceled');
		dismissModalFilter();
	};
	const { presentModal: presentModalSearch, dismissModal: dismissModalSearch } = useModal({
		onCancel: cancelModalSearch,
		onConfirm: confirmModalSearch,
		title: 'Search',
		component: <SearchModalContent />
	});
	const { presentModal: presentModalFilter, dismissModal: dismissModalFilter } = useModal({
		onCancel: cancelModalFilter,
		onConfirm: confirmModalFilter,
		title: 'Filters',
		component: <FilterModal setSelectedFilter={setSelectedFilter} selectedFilter={selectedFilter} />
	});

	return (
		<div className={styles.FeedSearchButtonContainer}>
			<div onClick={presentModalSearch} className={styles.FeedSearchButtonShadow}>
				<div className={styles.FeedSearchButtonContent}>
					<div>
						<IconSearch size={25} />
					</div>
					<div className={classNames(styles.label, 'body', 'bold')}>Find a campsite</div>
					<div onClick={presentModalFilter} className={styles.FilterButton}>
						<IconFilter size={25} />
					</div>
				</div>
			</div>
		</div>
	);
};
