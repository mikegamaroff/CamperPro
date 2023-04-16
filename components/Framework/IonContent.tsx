import React from 'react';

interface CustomIonContentProps {
	className?: string;
	scrollEvents?: boolean;
	forceOverscroll?: boolean;
	fullscreen?: boolean;
	scrollX?: boolean;
	scrollY?: boolean;
	onIonScrollStart?: (event: CustomEvent<void>) => void;
	onIonScroll?: (event: CustomEvent<void>) => void;
	onIonScrollEnd?: (event: CustomEvent<void>) => void;
	children?: React.ReactNode;
}

const IonContent: React.FC<CustomIonContentProps> = ({
	className,
	scrollEvents,
	forceOverscroll,
	fullscreen,
	scrollX,
	scrollY,
	onIonScrollStart,
	onIonScroll,
	onIonScrollEnd,
	children
}) => {
	return React.createElement(
		'ion-content',
		{
			class: className,
			scrollEvents,
			forceOverscroll,
			fullscreen,
			scrollX,
			scrollY,
			onIonScrollStart,
			onIonScroll,
			onIonScrollEnd
		},
		children
	);
};

export default IonContent;
