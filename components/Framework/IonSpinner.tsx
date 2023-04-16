import React from 'react';

interface CustomIonSpinnerProps {
	name?: 'lines' | 'lines-small' | 'dots' | 'bubbles' | 'circles' | 'circular' | 'crescent' | string;
	color?: string;
	paused?: boolean;
	duration?: number;
	children?: React.ReactNode;
}

const IonSpinner: React.FC<CustomIonSpinnerProps> = ({ name, color, paused, duration, children }) => {
	return React.createElement(
		'ion-spinner',
		{
			name,
			color,
			paused,
			duration
		},
		children
	);
};

export default IonSpinner;
