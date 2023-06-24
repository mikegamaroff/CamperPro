import FeedFilters from '@components/FeedFilters';
import { FilterContext } from '@context/filterContext';
import { CampsiteFilter, CampsiteLocation } from '@model/campsite';
import { useGetAllCampsiteLocations } from '@routes/useGetAllCampsites';
import classNames from 'classnames';
import { ChangeEvent, FC, useContext, useRef, useState } from 'react';
import useModal from '../hooks/useModal';
import styles from './FeedSearchButton.module.css';
import { Input } from './Forms/Input';
import { IconFilter, IconLocation } from './Icons';

export const FeedSearchButton: FC = () => {
	const [searchValue, setSearchValue] = useState<string>();
	const [selectedLocationFilter, setSelectedLocationFilter] = useState<CampsiteFilter>({});
	const { locations, setLocations } = useGetAllCampsiteLocations({ filters: selectedLocationFilter });
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

	const handleLocationSelect = (value: CampsiteLocation) => {
		setSearchValue(value.nearestTown + ' ' + value.state);
		setSelectedFilter(prevFilter => ({ ...prevFilter, searchLocation: value.nearestTown + ' ' + value.state }));
		setLocations([]);
	};

	const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { value } = e.target;

		setSearchValue(value);

		// clear previous timeout if it exists
		if (debounceTimeoutRef.current) {
			clearTimeout(debounceTimeoutRef.current);
		}

		// set new timeout
		debounceTimeoutRef.current = setTimeout(() => {
			setSelectedLocationFilter(prevFilter => ({ ...prevFilter, searchLocation: value }));
		}, 500); // 500ms delay
	};
	const heightStyle =
		locations.length > 0 && selectedLocationFilter.searchLocation
			? { height: `${locations.length * 60 + 30}px`, padding: '30px 9px 30px 9px' }
			: { height: '0px', padding: '0px 9px 0px 9px' };
	return (
		<div className={styles.FeedSearchButtonContainer}>
			{Modal}
			<div className={styles.searchOverlayContainer}>
				<div className={styles.searchOverlay} style={heightStyle}>
					{locations.map((location: CampsiteLocation, index) => {
						return (
							<div
								onClick={() => handleLocationSelect(location)}
								className={styles.searchResultContainer}
								key={location.nearestTown + ', ' + location.state + index}
							>
								<div className={styles.searchResultIcon}>
									<IconLocation size={20} />
								</div>
								<div>{location.nearestTown + ', ' + location.state}</div>
							</div>
						);
					})}
				</div>
			</div>
			<div className={styles.FeedSearchButtonShadow}>
				<div className={styles.FeedSearchButtonContent}>
					<div>
						<IconLocation size={25} />
					</div>
					<div className={classNames(styles.label, 'body', 'bold')}>
						<Input
							className={styles.borderlessField}
							placeholder="Search location"
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
