import FeedFilters from '@components/FeedFilters';
import { FilterContext } from '@context/filterContext';
import classNames from 'classnames';
import { ChangeEvent, FC, useContext, useRef, useState } from 'react';
import useModal from '../hooks/useModal';
import styles from './FeedSearchButton.module.css';
import { Input } from './Forms/Input';
import { IconFilter, IconSearch } from './Icons';

export const FeedSearchButton: FC = () => {
	const [searchValue, setSearchValue] = useState<string>();
	const debounceTimeoutRef = useRef<NodeJS.Timeout>();
	const { setSelectedFilter } = useContext(FilterContext);
	const confirmModalSearch = () => {
		console.log('Confirmed');
		dismissModal();
	};

	const cancelModalSearch = () => {
		console.log('Canceled');
		dismissModal();
	};

	const { Modal, presentModal, dismissModal } = useModal({
		onCancel: cancelModalSearch,
		onConfirm: confirmModalSearch,
		component: <FeedFilters />,
		title: 'Filters'
	});

	const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { value } = e.target;
		setSearchValue(value);

		// clear previous timeout if it exists
		if (debounceTimeoutRef.current) {
			clearTimeout(debounceTimeoutRef.current);
		}

		// set new timeout
		debounceTimeoutRef.current = setTimeout(() => {
			setSelectedFilter(prevFilter => ({ ...prevFilter, searchLocation: value }));
		}, 500); // 500ms delay
	};
	return (
		<div className={styles.FeedSearchButtonContainer}>
			{Modal}
			<div className={styles.FeedSearchButtonShadow}>
				<div className={styles.FeedSearchButtonContent}>
					<div>
						<IconSearch size={25} />
					</div>
					<div className={classNames(styles.label, 'body', 'bold')}>
						<Input
							className={styles.borderlessField}
							placeholder="Find a campsite"
							value={searchValue}
							onChange={handleSearchChange}
						/>
					</div>

					<div className={styles.FilterButton} onClick={presentModal}>
						<IconFilter size={25} />
					</div>
				</div>
			</div>
		</div>
	);
};
