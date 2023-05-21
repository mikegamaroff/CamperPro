import classNames from 'classnames';
import { FC } from 'react';
import useModal from '../hooks/useModal';
import styles from './FeedSearchButton.module.css';
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
	const FilterModalContent = () => {
		return (
			<div>
				<h2>Filters</h2>
				<p>Filters</p>
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
		component: <SearchModalContent />
	});
	const { presentModal: presentModalFilter, dismissModal: dismissModalFilter } = useModal({
		onCancel: cancelModalFilter,
		onConfirm: confirmModalFilter,
		component: <FilterModalContent />
	});

	return (
		<div onClick={presentModalSearch} className={styles.FeedSearchButtonContainer}>
			<div className={styles.FeedSearchButtonContent}>
				<div>
					<IconSearch size={25} />
				</div>
				<div className={classNames(styles.label, 'h5-bold')}>Find a campsite</div>
				<div onClick={presentModalFilter} className={styles.FilterButton}>
					<IconFilter size={30} />
				</div>
			</div>
		</div>
	);
};
