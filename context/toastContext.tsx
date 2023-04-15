import React, { createContext, useContext, useEffect, useState } from 'react';

interface ToastContextData {
	showToast: (color: string, message: string) => void;
}

const ToastContext = createContext<ToastContextData>({} as ToastContextData);

export const ToastProvider: React.FC = ({ children }) => {
	const [toast, setToast] = useState<{
		color: string;
		message: string;
		isVisible: boolean;
	}>({
		color: '',
		message: '',
		isVisible: false
	});

	const showToast = (color: string, message: string) => {
		setToast({ color, message, isVisible: true });
	};

	useEffect(() => {
		if (toast.isVisible) {
			const ionToast = document.createElement('ion-toast');
			ionToast.color = toast.color;
			ionToast.id = 'my-toast';
			ionToast.message = toast.message;
			ionToast.duration = 5000;
			ionToast.addEventListener('ion-toast-will-dismiss', () => {
				setToast({ ...toast, isVisible: false });
			});
			document.body.appendChild(ionToast);
			ionToast.present();
		} else {
			const existingToast = document.querySelector('#my-toast');
			if (existingToast) {
				existingToast.remove();
			}
		}
	}, [toast]);

	return <ToastContext.Provider value={{ showToast }}>{children}</ToastContext.Provider>;
};

export const useToast = () => {
	const context = useContext(ToastContext);
	return context;
};
