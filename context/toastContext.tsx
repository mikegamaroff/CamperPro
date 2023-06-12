// toastContext.tsx
import React, { createContext, useContext, useState } from 'react';
import useToast from '../hooks/useToast';

interface ToastContextData {
	showToast: (color: string, message: string) => void;
}

const ToastContext = createContext<ToastContextData>({} as ToastContextData);

interface ToastProviderProps {
	children: React.ReactNode;
}

export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
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
		// Reset state to initial values
		setToast({
			color: '',
			message: '',
			isVisible: false
		});

		// Set new state with a delay, so React doesn't batch the updates together
		setTimeout(() => {
			setToast({
				color,
				message,
				isVisible: true
			});
		}, 0);
	};

	useToast(toast.color, toast.message, toast.isVisible);

	return <ToastContext.Provider value={{ showToast }}>{children}</ToastContext.Provider>;
};

export const useGlobalToast = () => {
	const context = useContext(ToastContext);
	return context;
};
