import { useEffect, useRef } from 'react';

const useToast = (color: string, message: string, isVisible: boolean) => {
	const toastRef = useRef<any>(null); // Ref to hold the toast element

	useEffect(() => {
		if (isVisible) {
			toastRef.current = document.createElement('ion-toast');
			toastRef.current.color = color;
			toastRef.current.message = message;
			toastRef.current.duration = 3000;
			document.body.appendChild(toastRef.current);
			toastRef.current.present();
		}

		return () => {
			// If toast exists, dismiss it
			if (toastRef.current) {
				toastRef.current.dismiss();
			}
		};
	}, [color, message, isVisible]);

	return null;
};

export default useToast;
