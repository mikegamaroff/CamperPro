import React from 'react';

// IonHeader
interface CustomIonHeaderProps {
	className?: string;
	children?: React.ReactNode;
}

const IonHeader: React.FC<CustomIonHeaderProps> = ({ className, children }) => {
	return React.createElement('ion-header', { class: className }, children);
};

// IonToolbar
interface CustomIonToolbarProps {
	className?: string;
	children?: React.ReactNode;
}

const IonToolbar: React.FC<CustomIonToolbarProps> = ({ className, children }) => {
	return React.createElement('ion-toolbar', { class: className }, children);
};

// IonTitle
interface CustomIonTitleProps {
	className?: string;
	children?: React.ReactNode;
}

const IonTitle: React.FC<CustomIonTitleProps> = ({ className, children }) => {
	return React.createElement('ion-title', { class: className }, children);
};

export { IonHeader, IonToolbar, IonTitle };
