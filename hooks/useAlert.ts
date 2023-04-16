// useAlert.tsx
import { AlertButton, AlertInput } from '@ionic/core';
import { useCallback, useRef, useState } from 'react';

interface UseAlertProps {
	header?: string;
	subHeader?: string;
	message?: string;
	buttons?: AlertButton[];
	inputs?: AlertInput[];
}

const useAlert = ({ header, subHeader, message, buttons, inputs }: UseAlertProps) => {
	const [alert, setAlert] = useState<HTMLIonAlertElement | null>(null);
	const alertRef = useRef<HTMLIonAlertElement | null>(null);

	const presentAlert = useCallback(async () => {
		if (!alert) {
			const a = document.createElement('ion-alert') as HTMLIonAlertElement;

			a.header = header || '';
			a.subHeader = subHeader || '';
			a.message = message || '';
			a.inputs = inputs || [];
			a.buttons = buttons || [];

			document.body.appendChild(a);

			setAlert(a);
			alertRef.current = a;
			await a.present();
		} else {
			alert.present();
		}
	}, [alert, header, subHeader, message, buttons, inputs]);

	const dismissAlert = useCallback(() => {
		alertRef.current?.dismiss();
	}, [alert]);

	return { presentAlert, dismissAlert };
};

export default useAlert;
