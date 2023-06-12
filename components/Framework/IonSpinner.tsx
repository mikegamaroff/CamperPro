import React from 'react';

interface CustomIonSpinnerProps {
	name?: 'lines' | 'lines-small' | 'dots' | 'bubbles' | 'circles' | 'circular' | 'crescent' | string;
	color?: string;
	paused?: boolean;
	duration?: number;
	children?: React.ReactNode;
	className?: string;
}

const IonSpinner: React.FC<CustomIonSpinnerProps> = ({
	name,
	color = 'tertiary',
	paused,
	duration,
	children,
	className
}) => {
	return (
		<div className={className}>
			{React.createElement(
				'ion-spinner',
				{
					name,
					color,
					paused,
					duration
				},
				children
			)}
		</div>
	);
};

export default IonSpinner;
