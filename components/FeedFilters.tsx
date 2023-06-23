import { Container } from '@components/Container';
import Checkbox from '@components/Forms/Checkbox';
import IonRange from '@components/Framework/IonRange';
import { IconProps, iconComponents } from '@components/Icons';
import { FilterContext } from '@context/filterContext';
import { CampsiteFilter } from '@model/campsite';
import withAuth from '@pages/withAuth';
import { filterExists } from '@utils/filterExists';
import classNames from 'classnames';
import { ChangeEvent, ComponentType, useContext, useEffect, useState } from 'react';
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
	const [showAllFeatures, setShowAllFeatures] = useState(false);
	const [featureDivHeight, setFeatureDivHeight] = useState('300px');
	const [showAllAmenities, setShowAllAmenities] = useState(false);
	const [amenityDivHeight, setAmenityDivHeight] = useState('300px');
	const [showAllPermitted, setShowAllPermitted] = useState(false);
	const [permittedDivHeight, setPermittedDivHeight] = useState('300px');

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

	useEffect(() => {
		if (showAllFeatures) {
			const Div = document.getElementById('featureDiv');

			if (Div) {
				setFeatureDivHeight(`${Div.scrollHeight}px`);
			}
		} else {
			setFeatureDivHeight('300px');
		}
	}, [showAllFeatures]);

	useEffect(() => {
		if (showAllAmenities) {
			const Div = document.getElementById('amenityDiv');

			if (Div) {
				setAmenityDivHeight(`${Div.scrollHeight}px`);
			}
		} else {
			setAmenityDivHeight('300px');
		}
	}, [showAllAmenities]);

	useEffect(() => {
		if (showAllPermitted) {
			const Div = document.getElementById('permittedDiv');

			if (Div) {
				setPermittedDivHeight(`${Div.scrollHeight}px`);
			}
		} else {
			setPermittedDivHeight('300px');
		}
	}, [showAllPermitted]);

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
						<div className="medium">Features</div>
						<div id="featureDiv" className={styles.featuresGrid} style={{ height: featureDivHeight }}>
							{FilterButtons.map((filterbutton: FilterIconProps, i: number) => {
								if (filterbutton.id.amenity || filterbutton.id.permitted) {
									return null;
								}
								const IconComponent = filterbutton.icon || null;
								return (
									<div
										key={'filterbutton' + i}
										onClick={() => {
											handleSelectAttributes(filterbutton.id);
										}}
										className={styles.feature}
										style={
											filterExists(filterbutton.id)
												? { color: 'var(--foreground)', border: '2px solid var(--primary)' }
												: {
														color: 'var(--neutral700)',
														border: '1px solid var(--neutral150)'
												  }
										}
									>
										<IconComponent size={30} />
										<div>{filterbutton.label}</div>
									</div>
								);
							})}
						</div>
						<div>
							{!showAllFeatures && (
								<div
									className={classNames(styles.showButton, 'medium')}
									onClick={() => {
										setShowAllFeatures(true);
									}}
								>
									Show more
								</div>
							)}
							{showAllFeatures && (
								<div
									className={classNames(styles.showButton, 'medium')}
									onClick={() => {
										setShowAllFeatures(false);
									}}
								>
									Show less
								</div>
							)}
						</div>
					</div>
					<div>
						<hr />
					</div>
					<div className={styles.section}>
						<div className="medium">Amenities</div>
						<div id="amenityDiv" className={styles.featuresGrid} style={{ height: amenityDivHeight }}>
							{FilterButtons.map((filterbutton: FilterIconProps, i: number) => {
								if (filterbutton.id.feature || filterbutton.id.permitted) {
									return null;
								}
								const IconComponent = filterbutton.icon || null;
								return (
									<div
										key={'filterbutton' + i}
										onClick={() => {
											handleSelectAttributes(filterbutton.id);
										}}
										className={styles.feature}
										style={
											filterExists(filterbutton.id)
												? { color: 'var(--foreground)', border: '2px solid var(--primary)' }
												: {
														color: 'var(--neutral700)',
														border: '1px solid var(--neutral150)'
												  }
										}
									>
										<IconComponent size={30} />
										<div>{filterbutton.label}</div>
									</div>
								);
							})}
						</div>
						<div>
							{!showAllAmenities && (
								<div
									className={classNames(styles.showButton, 'medium')}
									onClick={() => {
										setShowAllAmenities(true);
									}}
								>
									Show more
								</div>
							)}
							{showAllAmenities && (
								<div
									className={classNames(styles.showButton, 'medium')}
									onClick={() => {
										setShowAllAmenities(false);
									}}
								>
									Show less
								</div>
							)}
						</div>
					</div>
					<div>
						<hr />
					</div>
					<div className={styles.section}>
						<div className="medium">Permitted</div>
						<div id="permittedDiv" className={styles.featuresGrid} style={{ height: permittedDivHeight }}>
							{FilterButtons.map((filterbutton: FilterIconProps, i: number) => {
								if (filterbutton.id.feature || filterbutton.id.amenity) {
									return null;
								}
								const IconComponent = filterbutton.icon || null;
								return (
									<div
										key={'filterbutton' + i}
										onClick={() => {
											handleSelectAttributes(filterbutton.id);
										}}
										className={styles.feature}
										style={
											filterExists(filterbutton.id)
												? { color: 'var(--foreground)', border: '2px solid var(--primary)' }
												: {
														color: 'var(--neutral700)',
														border: '1px solid var(--neutral150)'
												  }
										}
									>
										<IconComponent size={30} />
										<div>{filterbutton.label}</div>
									</div>
								);
							})}
						</div>
						<div>
							{!showAllPermitted && (
								<div
									className={classNames(styles.showButton, 'medium')}
									onClick={() => {
										setShowAllPermitted(true);
									}}
								>
									Show more
								</div>
							)}
							{showAllPermitted && (
								<div
									className={classNames(styles.showButton, 'medium')}
									onClick={() => {
										setShowAllPermitted(false);
									}}
								>
									Show less
								</div>
							)}
						</div>
					</div>
					<div>
						<hr />
					</div>
				</>
			</Container>
		</>
	);
};
export default withAuth(FeedFilters);
