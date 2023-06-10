import { CampsiteFilter } from '@model/campsite';
import classNames from 'classnames';
import React, { useState } from 'react';
import styles from './FilterModal.module.css';
import Checkbox from './Forms/Checkbox';
import IonRange from './Framework/IonRange';

interface FilterModalProps {
	setSelectedFilter: (filters: CampsiteFilter) => void;
	selectedFilter: CampsiteFilter;
}

export const FilterModal: React.FC<FilterModalProps> = ({ setSelectedFilter, selectedFilter }) => {
	const sliderDefaults = [20, 300];
	const [lowerValue, setLowerValue] = useState(selectedFilter.priceRange?.[0] || sliderDefaults[0]);
	const [upperValue, setUpperValue] = useState(selectedFilter.priceRange?.[1] || sliderDefaults[1]);
	const [filters, setFilters] = useState<CampsiteFilter>(selectedFilter);
	const [selectedButton, setSelectedButton] = useState(0);

	const rangeSliderHandle = (event: CustomEvent) => {
		const updatedFilters = { ...filters, priceRange: [event.detail.value.lower, event.detail.value.upper] };
		setLowerValue(event.detail.value.lower); // local state
		setUpperValue(event.detail.value.upper); // local state
		setFilters(updatedFilters); // local state
		setSelectedFilter(updatedFilters); // main state
	};

	const Plus = upperValue > 499 ? '+' : null;

	const handleButtonClick = (index: number) => {
		setSelectedButton(index);
		console.log(index);
	};

	const buttons = [1, 2, 3, 4, 5, 6, 7, 8, 9, '10+'];

	return (
		<div className={styles.container}>
			<div className={styles.section}>
				<div className="medium">Price range</div>
				<div>
					<div className={styles.text}>
						<div>
							${lowerValue}-${upperValue}
							{Plus}
						</div>
						<div className="caption">The average nightly price is $68</div>
					</div>
					<IonRange
						handleChange={rangeSliderHandle}
						min={10}
						max={500}
						defaultLower={sliderDefaults[0]}
						defaultUpper={sliderDefaults[1]}
						dualKnobs
					/>
				</div>
			</div>
			<div>
				<hr />
			</div>
			<div className={styles.section}>
				<div className="medium">Type of campsite</div>
				<div className={styles.option}>
					<div className={styles.text}>
						<div>Private</div>
						<div className="caption">Just you and your main crew</div>
					</div>
					<Checkbox />
				</div>
				<div className={styles.option}>
					<div className={styles.text}>
						<div>Shared</div>
						<div className="caption">Other campers might be nearby</div>
					</div>
					<Checkbox />
				</div>
			</div>
			<div>
				<hr />
			</div>
			<div className={styles.capacitySection}>
				<div className={classNames(styles.textPadding, 'medium')}>Capacity</div>
				<div className={styles.text}>
					<div className={styles.textPadding}>Number of tent sites</div>
					<div className={styles.buttons}>
						<div
							onClick={() => handleButtonClick(0)}
							className={styles.anyButton}
							style={{
								backgroundColor: selectedButton === 0 ? 'var(--foreground)' : 'var(--background)',
								color: selectedButton === 0 ? 'var(--background)' : 'var(--foreground)'
							}}
						>
							Any
						</div>
						{buttons.map((buttonText, index) => (
							<div
								key={index}
								onClick={() => handleButtonClick(index + 1)}
								className={styles.button}
								style={{
									backgroundColor:
										selectedButton === index + 1 ? 'var(--foreground)' : 'var(--background)',
									color: selectedButton === index + 1 ? 'var(--background)' : 'var(--foreground)'
								}}
							>
								<div className={styles.buttonText}>{buttonText}</div>
							</div>
						))}
					</div>
				</div>
			</div>
			<div>
				<hr />
			</div>
		</div>
	);
};
