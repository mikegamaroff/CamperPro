import classNames from 'classnames';
import React, { useState } from 'react';
import styles from './FilterModal.module.css';
import Checkbox from './Forms/Checkbox';
import IonRange from './Framework/IonRange';

export const FilterModal: React.FC = () => {
	const [lowerValue, setLowerValue] = useState(50);
	const [upperValue, setUpperValue] = useState(300);
	const [selectedButton, setSelectedButton] = useState(0);

	const rangeSliderHandle = (event: CustomEvent) => {
		setLowerValue(event.detail.value.lower);
		setUpperValue(event.detail.value.upper);
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
						defaultLower={lowerValue}
						defaultUpper={upperValue}
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
