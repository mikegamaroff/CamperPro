export const GoTo = (path: string) => {
	// Check if window is defined (i.e., we're in the browser)
	if (typeof window !== 'undefined') {
		const navigationEvent = new CustomEvent('navigateTo', { detail: path });
		window.dispatchEvent(navigationEvent);
	}
};
