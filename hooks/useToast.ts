import { useEffect } from 'react';

const useToast = (color: string, message: string) => {
	useEffect(() => {
		const toast = document.createElement('ion-toast');
		toast.color = color;
		toast.message = message;
		toast.duration = 3000;
		document.body.appendChild(toast);

		return () => {
			document.body.removeChild(toast);
		};
	}, [color, message]);

	return null;
};

export default useToast;
