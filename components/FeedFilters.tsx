import { Container } from '@components/Container';
import Checkbox from '@components/Forms/Checkbox';
import IonRange from '@components/Framework/IonRange';
import { FilterContext } from '@context/filterContext';
import { useAdjustFilterHeights } from '@hooks/useAdjustFilterHeight';
import { useAttributesShowMoreButton } from '@hooks/useAttributesShowMoreButton';
import { CampsiteFilter, FilterButtons, FilterIconProps } from '@model/campsite';
import withAuth from '@pages/withAuth';
import { filterExists } from '@utils/filterExists';
import classNames from 'classnames';
import { ChangeEvent, useContext, useRef, useState } from 'react';
import styles from './FeedFilters.module.css';
import Switch from './Forms/Switch';

export const FeedFilters: React.FC = () => {
	const sliderDefaults = [20, 300];
	const { selectedFilter, handleSelectAttributes, setSelectedFilter } = useContext(FilterContext);
	const [capacityButtonColor, setCapacityButtonColor] = useState(0);
	const [isPrivate, setIsPrivate] = useState<boolean>(false);
	const [isPublic, setIsPublic] = useState<boolean>(false);
	const [showAllFeatures, setShowAllFeatures] = useState(false);
	const [featureDivHeight, setFeatureDivHeight] = useState('300px');
	const [showAllAmenities, setShowAllAmenities] = useState(false);
	const [amenityDivHeight, setAmenityDivHeight] = useState('297px');
	const [showAllPermitted, setShowAllPermitted] = useState(false);
	const [permittedDivHeight, setPermittedDivHeight] = useState('297px');
	const featureDivRef = useRef<HTMLDivElement>(null);
	const amenityDivRef = useRef<HTMLDivElement>(null);
	const permittedDivRef = useRef<HTMLDivElement>(null);

	const rangeSliderHandle = (event: CustomEvent) => {
		setSelectedFilter(prevFilter => ({
			...prevFilter,
			priceRange: [event.detail.value.lower, event.detail.value.upper]
		}));
	};
	const handleCapacityButtonClick = (buttonNumber: number) => {
		setSelectedFilter(prevFilter => ({
			...prevFilter,
			numberOfTentSites: buttonNumber === 0 ? undefined : buttonNumber
		}));
		setCapacityButtonColor(buttonNumber);
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

	const capacityButtons = ['Any', 1, 2, 3, 4, 5, 6, 7, 8, 9, '10+'];

	console.log(selectedFilter);

	useAdjustFilterHeights(showAllFeatures, featureDivRef, setFeatureDivHeight, '300px');
	useAdjustFilterHeights(showAllAmenities, amenityDivRef, setAmenityDivHeight, '297px');
	useAdjustFilterHeights(showAllPermitted, permittedDivRef, setPermittedDivHeight, '297px');

	const { showMoreAmenitiesButton } = useAttributesShowMoreButton(amenityDivRef, 297, 'amenity');
	const { showMorePermittedButton } = useAttributesShowMoreButton(permittedDivRef, 297, 'permitted');

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
							<div className={styles.capacityButtons}>
								{capacityButtons.map((capacityButtonText, index) => {
									return (
										<div
											key={index}
											onClick={() => handleCapacityButtonClick(index)}
											className={styles.pillButton}
											style={{
												backgroundColor:
													capacityButtonColor === index
														? 'var(--foreground)'
														: 'var(--background)',
												color:
													capacityButtonColor === index
														? 'var(--background)'
														: 'var(--foreground)'
											}}
										>
											<div className={styles.buttonText}>{capacityButtonText}</div>
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
						<div ref={featureDivRef} className={styles.featuresGrid} style={{ height: featureDivHeight }}>
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
						<div ref={amenityDivRef} className={styles.optionsList} style={{ height: amenityDivHeight }}>
							{FilterButtons.map((filterbutton: FilterIconProps, i: number) => {
								if (filterbutton.id.feature || filterbutton.id.permitted) {
									return null;
								}

								return (
									<div
										key={'filterbutton' + i}
										onClick={() => {
											handleSelectAttributes(filterbutton.id);
										}}
										className={styles.option}
									>
										<div className={styles.text}>
											<div>{filterbutton.label}</div>
											<div className="caption">subtext</div>
										</div>
										<Switch
											checked={filterExists(filterbutton.id)}
											onIonChange={() => handleSelectAttributes(filterbutton.id)}
										/>
									</div>
								);
							})}
						</div>
						{showMoreAmenitiesButton && (
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
						)}
					</div>
					<div>
						<hr />
					</div>
					<div className={styles.section}>
						<div className="medium">{`What's allowed`}</div>
						<div
							ref={permittedDivRef}
							className={styles.optionsList}
							style={{ height: permittedDivHeight }}
						>
							{FilterButtons.map((filterbutton: FilterIconProps, i: number) => {
								if (filterbutton.id.feature || filterbutton.id.amenity) {
									return null;
								}

								return (
									<div
										key={'filterbutton' + i}
										onClick={() => {
											handleSelectAttributes(filterbutton.id);
										}}
										className={styles.option}
									>
										<div className={styles.text}>
											<div>{filterbutton.label}</div>
											<div className="caption">subtext</div>
										</div>
										<Switch
											checked={filterExists(filterbutton.id)}
											onIonChange={() => handleSelectAttributes(filterbutton.id)}
										/>
									</div>
								);
							})}
						</div>
						{showMorePermittedButton && (
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
						)}
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
