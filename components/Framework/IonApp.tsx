import React from 'react';

interface CustomIonAppProps {
	className?: string;
	mode?: 'ios' | 'md';
	color?: string;
	children?: React.ReactNode;
}

const IonApp: React.FC<CustomIonAppProps> = ({ className, mode, color, children }) => {
	return React.createElement(
		'ion-app',
		{
			class: className,
			mode,
			color
		},
		children
	);
};

export default IonApp;
