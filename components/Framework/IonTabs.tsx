import React, { MouseEvent } from 'react';

// IonTabs
interface CustomIonTabsProps {
	children?: React.ReactNode;
	onIonTabsDidChange?: (event: CustomEvent) => void;
}

const IonTabs: React.FC<CustomIonTabsProps> = ({ children, onIonTabsDidChange }) => {
	return React.createElement('ion-tabs', { onIonTabsDidChange }, children);
};

// IonTab
interface CustomIonTabProps {
	tab: string;
}

const IonTab: React.FC<CustomIonTabProps> = ({ tab }) => {
	return React.createElement('ion-tab', { tab });
};

// IonTabBar
interface CustomIonTabBarProps {
	slot: string;
	children?: React.ReactNode;
}

const IonTabBar: React.FC<CustomIonTabBarProps> = ({ slot, children }) => {
	return React.createElement('ion-tab-bar', { slot }, children);
};

interface CustomIonTabButtonProps {
	tab: string;
	children?: React.ReactNode;
	onClick?: (event: MouseEvent<HTMLIonTabButtonElement>) => void;
	selected?: boolean;
}

const IonTabButton: React.FC<CustomIonTabButtonProps> = ({ tab, children, onClick, selected }) => {
	return React.createElement('ion-tab-button', { tab, onClick, selected }, children);
};

export { IonTabs, IonTab, IonTabBar, IonTabButton };
