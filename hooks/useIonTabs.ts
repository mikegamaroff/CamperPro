import { useEffect, useState } from 'react';

export function useIonTabs() {
	const [tabs, setTabs] = useState<HTMLIonTabsElement | null>(null);

	useEffect(() => {
		if (typeof window !== 'undefined') {
			// Add this line
			const ionTabs = document.querySelector('ion-tabs') as HTMLIonTabsElement;
			setTabs(ionTabs);
		}
	}, []);

	return tabs;
}
