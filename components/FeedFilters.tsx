import { Container } from '@components/Container';
import Checkbox from '@components/Forms/Checkbox';
import IonRange from '@components/Framework/IonRange';
import { IconProps, iconComponents } from '@components/Icons';
import { FilterContext } from '@context/filterContext';
import { CampsiteFilter } from '@model/campsite';
import withAuth from '@pages/withAuth';
import { filterExists } from '@utils/filterExists';
import classNames from 'classnames';
import { ChangeEvent, ComponentType, useContext, useState } from 'react';
import { FilterIDType } from '../model/campsite';
import styles from './FeedFilters.module.css';

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
		label: iconComponents.shower.label,
		icon: iconComponents.shower.icon,
		id: { amenity: 'shower' }
	},
	{
		label: iconComponents.barbecue.label,
		icon: iconComponents.barbecue.icon,
		id: { amenity: 'barbecue' }
	}
];

export const FeedFilters: React.FC = () => {
	const sliderDefaults = [20, 300];
	const { selectedFilter, handleSelectAttributes, setSelectedFilter } = useContext(FilterContext);
	const [buttonColor, setButtonColor] = useState(0);
	const [isPrivate, setIsPrivate] = useState<boolean>(false);
	const [isPublic, setIsPublic] = useState<boolean>(false);

	const rangeSliderHandle = (event: CustomEvent) => {
		setSelectedFilter(prevFilter => ({
			...prevFilter,
			priceRange: [event.detail.value.lower, event.detail.value.upper]
		}));
	};
	const handleButtonClick = (buttonNumber: number) => {
		setSelectedFilter(prevFilter => ({
			...prevFilter,
			numberOfTentSites: buttonNumber === 0 ? undefined : buttonNumber
		}));
		setButtonColor(buttonNumber);
	};

	const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
		const checked = event.target.checked;
		const id = event.target.id;
		const updatedFilters: CampsiteFilter = { ...selectedFilter, private: id === 'private' ? checked : !checked };
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
		setSelectedFilter(updatedFilters);
	};

	const Plus = selectedFilter?.priceRange && selectedFilter.priceRange?.[1] > 499 ? '+' : null;

	const buttons = ['Any', 1, 2, 3, 4, 5, 6, 7, 8, 9, '10+'];

	console.log(selectedFilter);

	return (
		<>
			<Container scroll hidetabs shelfHeight={40}>
				<>
					<div className={styles.section}>
						<div className="medium">Price range</div>
						<div>
							<div className={styles.text}>
								{selectedFilter.priceRange && (
									<div>
										${selectedFilter?.priceRange?.[0]}-${selectedFilter?.priceRange?.[1]}
										{Plus}
									</div>
								)}
								{!selectedFilter.priceRange && (
									<div>
										${sliderDefaults[0]}-${sliderDefaults[1]}
									</div>
								)}
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
													buttonColor === index ? 'var(--foreground)' : 'var(--background)',
												color: buttonColor === index ? 'var(--background)' : 'var(--foreground)'
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
										onClick={() => handleSelectAttributes(filterbutton.id)}
										className={styles.feature}
										style={filterExists(filterbutton.id) ? { color: 'red' } : { color: 'black' }}
									>
										<IconComponent size={30} />
										<div>{filterbutton.label}</div>
									</div>
								);
							})}
						</div>
					</div>
				</>
			</Container>
		</>
	);
};
export default withAuth(FeedFilters);
