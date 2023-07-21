import { getLocalDay } from '@model/date';
import React, { useEffect, useRef } from 'react';

interface DateTimePickerProps {
	onDatetimeChange: (value: string) => void;
	disabledDates?: string[];
	min?: string;
	max?: string;
}

const DateTimePicker: React.FC<DateTimePickerProps> = ({ onDatetimeChange, disabledDates, min, max }) => {
	const datetimeRef = useRef<HTMLIonDatetimeElement | null>(null);

	useEffect(() => {
		if (datetimeRef.current) {
			datetimeRef.current.addEventListener('ionChange', (event: Event) => {
				const customEvent = event as CustomEvent<{ value: string }>;
				onDatetimeChange(customEvent.detail.value);
			});
			// Add this line to disable specific dates
			datetimeRef.current.isDateEnabled = date => !disabledDates?.includes(date);
		}
	}, [onDatetimeChange, disabledDates]);

	return (
		<div
			className="calendar-background"
			ref={el => {
				if (el) {
					const datetime = document.createElement('ion-datetime') as HTMLIonDatetimeElement;
					datetime.className = 'timepicker';
					datetime.min = min || getLocalDay();
					datetime.max = max;
					datetime.showDefaultButtons = true;
					datetime.presentation = 'date';
					el.appendChild(datetime);
					datetimeRef.current = datetime;
				}
			}}
		/>
	);
};

export default DateTimePicker;
