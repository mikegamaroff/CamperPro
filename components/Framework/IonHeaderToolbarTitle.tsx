import React from 'react';

// IonHeader
interface CustomIonHeaderProps {
	className?: string;
	children?: React.ReactNode;
}

const IonHeader: React.FC<CustomIonHeaderProps> = ({ className, children }) => {
	return React.createElement('ion-header', { class: className }, children);
};

const IonFooter: React.FC<CustomIonHeaderProps> = ({ className, children }) => {
	const style = {
		position: 'absolute',
		bottom: '0',
		width: '100%'
	};
	return React.createElement('ion-footer', { class: className, style }, children);
};

// IonToolbar
interface CustomIonToolbarProps {
	className?: string;
	children?: React.ReactNode;
	position?: 'top' | 'bottom';
}

const IonToolbar: React.FC<CustomIonToolbarProps> = ({ className, children, position = 'top' }) => {
	const style = {};
	return React.createElement('ion-toolbar', { class: className, style }, children);
};

// IonTitle
interface CustomIonTitleProps {
	className?: string;
	children?: React.ReactNode;
}

const IonTitle: React.FC<CustomIonTitleProps> = ({ className, children }) => {
	return React.createElement('ion-title', { class: className }, children);
};

export { IonFooter, IonHeader, IonTitle, IonToolbar };
