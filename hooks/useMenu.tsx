// useMenu.tsx
import { createElement, useCallback, useState } from 'react';
import { createRoot } from 'react-dom/client';
import MenuContent from '../components/Menu';

const useMenu = () => {
	const [menuInitialized, setMenuInitialized] = useState(false);

	const closeMenu = useCallback(async () => {
		const menu = document.querySelector('ion-menu') as HTMLIonMenuElement;
		menu?.close();
	}, []);

	const openMenu = useCallback(async () => {
		if (!menuInitialized) {
			const m = document.createElement('ion-menu') as HTMLIonMenuElement;
			m.contentId = 'main-content';
			const content = document.createElement('div');
			const contentContainer = document.createElement('ion-content');

			const menuContentWithClose = createElement(MenuContent, { onClose: closeMenu });
			createRoot(content).render(menuContentWithClose);

			content.appendChild(contentContainer);
			m.appendChild(content);

			document.body.appendChild(m);

			setMenuInitialized(true);
		}
		const menu = document.querySelector('ion-menu') as HTMLIonMenuElement;
		menu?.open();
	}, [menuInitialized, closeMenu]);

	return { openMenu };
};

export default useMenu;
