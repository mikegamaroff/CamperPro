import React, { useEffect, useRef, useState } from 'react';

interface SliderValue {
	lower: number;
	upper: number;
}

interface CustomIonRangeProps {
	min?: number;
	max?: number;
	defaultLower?: number;
	defaultUpper?: number;
	step?: number;
	value?: number | SliderValue;
	dualKnobs?: boolean;
	handleChange: (event: CustomEvent) => void;
}

const IonRange: React.FC<CustomIonRangeProps> = ({
	min = 0,
	max = 100,
	step = 1,
	defaultLower = 25,
	defaultUpper = 75,
	value,
	dualKnobs = false,
	handleChange
}) => {
	const rangeRef = useRef<HTMLDivElement | null>(null);
	const [defaultValue, setDefaultValue] = useState(dualKnobs ? { lower: defaultLower, upper: defaultUpper } : 50);
	const [rangeValue, setRangeValue] = useState(value ?? defaultValue);

	const handleIonChange = (e: Event) => {
		const customEvent = e as CustomEvent;
		handleChange(customEvent);
		setRangeValue(customEvent.detail.value);
	};

	useEffect(() => {
		if (rangeRef.current) {
			const ionRangeElement = rangeRef.current.querySelector('ion-range');
			if (ionRangeElement) {
				ionRangeElement.addEventListener('ionChange', handleIonChange);

				return () => {
					ionRangeElement.removeEventListener('ionChange', handleIonChange);
				};
			}
		}
	}, []);

	useEffect(() => {
		setDefaultValue(dualKnobs ? { lower: defaultLower, upper: defaultUpper } : 50);
	}, [dualKnobs]);

	useEffect(() => {
		setRangeValue(value ?? defaultValue);
	}, [value, defaultValue]);

	useEffect(() => {
		if (rangeRef.current) {
			const ionRangeElement = rangeRef.current.querySelector('ion-range');
			if (ionRangeElement) {
				ionRangeElement.value = rangeValue;
			}
		}
	}, [rangeRef, rangeValue]);

	return (
		<div ref={rangeRef}>
			{React.createElement('ion-range', {
				min,
				max,
				step,
				value: rangeValue,
				'dual-knobs': dualKnobs,
				pin: true
			})}
		</div>
	);
};

export default IonRange;
