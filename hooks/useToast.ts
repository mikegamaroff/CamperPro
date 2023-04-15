// useToast.tsx
import { useEffect } from 'react';

const useToast = (color: string, message: string, isVisible: boolean) => {
	useEffect(() => {
		if (isVisible) {
			const toast = document.createElement('ion-toast');
			toast.color = color;
			toast.message = message;
			toast.duration = 3000;
			document.body.appendChild(toast);

			toast.present();

			return () => {
				document.body.removeChild(toast);
			};
		}
	}, [color, message, isVisible]);

	return null;
};

export default useToast;
