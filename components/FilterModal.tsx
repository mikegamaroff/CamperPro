import { CampsiteFilter } from '@model/campsite';
import classNames from 'classnames';
import React, { ChangeEvent, ComponentType, useState } from 'react';
import { FilterIDType } from '../model/campsite';
import styles from './FilterModal.module.css';
import Checkbox from './Forms/Checkbox';
import IonRange from './Framework/IonRange';
import { IconProps, iconComponents } from './Icons';

interface FilterModalProps {
	setSelectedFilter: (filters: CampsiteFilter) => void;
	selectedFilter: CampsiteFilter;
}

interface FilterIconProps {
	icon: ComponentType<IconProps>;
	label: string;
	id: FilterIDType;
}

const FilterButtons: FilterIconProps[] = [
	{
		label: iconComponents.river.label,
		icon: iconComponents.river.icon,
		id: { feature: 'river' }
	},
	{
		label: iconComponents.mountain.label,
		icon: iconComponents.mountain.icon,
		id: { feature: 'mountain' }
	},
	{
		label: iconComponents.lake.label,
		icon: iconComponents.lake.icon,
		id: { feature: 'lake' }
	},
	{
		label: iconComponents.hunting.label,
		icon: iconComponents.hunting.icon,
		id: { permitted: 'hunting' }
	},
	{
		label: iconComponents.sea.label,
		icon: iconComponents.sea.icon,
		id: { feature: 'sea' }
	},
	{
		label: iconComponents.wildlife.label,
		icon: iconComponents.wildlife.icon,
		id: { feature: 'wildlife' }
	},
	{
		label: iconComponents.campfire.label,
		icon: iconComponents.campfire.icon,
		id: { permitted: 'campfire' }
	},
	{
		label: iconComponents.hiking.label,
		icon: iconComponents.hiking.icon,
		id: { feature: 'hiking' }
	},
	{
		label: iconComponents.cellsignal.label,
		icon: iconComponents.cellsignal.icon,
		id: { amenity: 'cellsignal' }
	},
	{
		label: iconComponents.forest.label,
		icon: iconComponents.forest.icon,
		id: { feature: 'forest' }
	},
	{
		label: iconComponents.climbing.label,
		icon: iconComponents.climbing.icon,
		id: { permitted: 'climbing' }
	},
	{
		label: iconComponents.pets.label,
		icon: iconComponents.pets.icon,
		id: { permitted: 'pets' }
	},
	{
		label: iconComponents.swimming.label,
		icon: iconComponents.swimming.icon,
		id: { permitted: 'swimming' }
	},
	{
		label: iconComponents.wifi.label,
		icon: iconComponents.wifi.icon,
		id: { amenity: 'wifi' }
	},
	{
		label: iconComponents.toilet.label,
		icon: iconComponents.toilet.icon,
		id: { amenity: 'toilet' }
	},
	{
		label: iconComponents.portapot.label,
		icon: iconComponents.portapot.icon,
		id: { amenity: 'portapot' }
	},
	{
		label: iconComponents.barbecue.label,
		icon: iconComponents.barbecue.icon,
		id: { amenity: 'barbecue' }
	},
	{
		label: iconComponents.shower.label,
		icon: iconComponents.shower.icon,
		id: { amenity: 'shower' }
	}
];

export const FilterModal: React.FC<FilterModalProps> = ({ setSelectedFilter, selectedFilter }) => {
	const sliderDefaults = [20, 300];
	const [lowerValue, setLowerValue] = useState(selectedFilter?.priceRange?.[0] || sliderDefaults[0]);
	const [upperValue, setUpperValue] = useState(selectedFilter?.priceRange?.[1] || sliderDefaults[1]);
	const [filters, setFilters] = useState<CampsiteFilter>(selectedFilter);
	const [selectedButton, setSelectedButton] = useState(selectedFilter?.numberOfTentSites || 0);
	const [isPrivate, setIsPrivate] = useState<boolean>(false);
	const [isPublic, setIsPublic] = useState<boolean>(false);

	const rangeSliderHandle = (event: CustomEvent) => {
		const updatedFilters: CampsiteFilter = {
			...filters,
			priceRange: [event.detail.value.lower, event.detail.value.upper]
		};
		setLowerValue(event.detail.value.lower); // local state
		setUpperValue(event.detail.value.upper); // local state
		setFilters(updatedFilters); // local state
		setSelectedFilter(updatedFilters); // main state
	};

	const handleAttributeSelect = (attributeType: any) => {
		const updatedFilters: CampsiteFilter = { ...filters, attributes: attributeType };
		setFilters(updatedFilters);
		setSelectedFilter(updatedFilters);
	};

	const handleButtonClick = (buttonNumber: number) => {
		const newNumber = buttonNumber === 0 ? undefined : buttonNumber;
		const updatedFilters: CampsiteFilter = { ...filters, numberOfTentSites: newNumber };
		setSelectedButton(buttonNumber);
		setFilters(updatedFilters);
		setSelectedFilter(updatedFilters);
	};

	const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
		const checked = event.target.checked;
		const id = event.target.id;
		const updatedFilters: CampsiteFilter = { ...filters, private: id === 'private' ? checked : !checked };

		if (!checked) {
			delete updatedFilters.private;
		}
		if (id === 'private') {
			setIsPrivate(checked);
			checked && setIsPublic(!checked);
		} else {
			setIsPublic(checked);
			checked && setIsPrivate(!checked);
		}
		setFilters(updatedFilters);
		setSelectedFilter(updatedFilters);
	};

	const Plus = upperValue > 499 ? '+' : null;

	console.log(filters);

	const buttons = ['Any', 1, 2, 3, 4, 5, 6, 7, 8, 9, '10+'];

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
					<Checkbox id="private" checked={isPrivate} onIonChange={handleCheckboxChange} />
				</div>
				<div className={styles.option}>
					<div className={styles.text}>
						<div>Shared</div>
						<div className="caption">Other campers might be nearby</div>
					</div>
					<Checkbox id="shared" checked={isPublic} onIonChange={handleCheckboxChange} />
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
						{buttons.map((buttonText, index) => {
							return (
								<div
									key={index}
									onClick={() => handleButtonClick(index)}
									className={styles.pillButton}
									style={{
										backgroundColor:
											selectedButton === index ? 'var(--foreground)' : 'var(--background)',
										color: selectedButton === index ? 'var(--background)' : 'var(--foreground)'
									}}
								>
									<div className={styles.buttonText}>{buttonText}</div>
								</div>
							);
						})}
					</div>
				</div>
			</div>
			<div>
				<hr />
			</div>
			<div className={styles.section}>
				<div className={styles.featuresGrid}>
					{FilterButtons.map((filterbutton: FilterIconProps, i: number) => {
						const IconComponent = filterbutton.icon || null;
						return (
							<div
								key={'filterbutton' + i}
								onClick={() =>
									handleAttributeSelect(
										filters.attributes !== filterbutton.id ? filterbutton.id : undefined
									)
								}
								className={styles.feature}
								style={filters.attributes === filterbutton.id ? { color: 'red' } : { color: 'black' }}
							>
								<IconComponent size={30} />
								<div>{filterbutton.label}</div>
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
};
