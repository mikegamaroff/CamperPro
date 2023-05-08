import React, { useEffect, useRef, useState } from 'react';

interface SliderValue {
	lower: number;
	upper: number;
}

interface CustomIonRangeProps {
	min?: number;
	max?: number;
	step?: number;
	value?: number | SliderValue;
	dualKnobs?: boolean;
	handleChange: (event: CustomEvent) => void;
}

const IonRange: React.FC<CustomIonRangeProps> = ({
	min = 0,
	max = 100,
	step = 1,
	value,
	dualKnobs = false,
	handleChange
}) => {
	const rangeRef = useRef<HTMLDivElement | null>(null);
	const [rangeValue, setRangeValue] = useState(value);

	const defaultValue = dualKnobs ? { lower: 25, upper: 75 } : 50;
	const valueProp = rangeValue === undefined ? defaultValue : rangeValue;

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
		if (rangeRef.current) {
			const ionRangeElement = rangeRef.current.querySelector('ion-range');
			if (ionRangeElement) {
				ionRangeElement.value = valueProp;
			}
		}
	}, [rangeRef, valueProp]);

	return (
		<div ref={rangeRef}>
			{React.createElement('ion-range', {
				min,
				max,
				step,
				value: valueProp,
				'dual-knobs': dualKnobs
			})}
		</div>
	);
};

export default IonRange;
