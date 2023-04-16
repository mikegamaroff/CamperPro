import React, { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';
import { CustomIonActionSheetProps } from '../../model/framework';

export interface IonActionSheetRef<T = unknown> extends HTMLIonActionSheetElement {
	present: () => Promise<void>;
	dismiss: (data?: T, role?: string) => Promise<boolean>;
}
interface IonActionSheetProps extends CustomIonActionSheetProps {
	setActionSheet: (actionSheet: IonActionSheetRef) => void;
	setIsRendered: (value: boolean) => void;
}

const IonActionSheet = forwardRef<IonActionSheetRef, IonActionSheetProps>(
	({ header, subHeader, message, buttons, cssClass, setActionSheet, setIsRendered }, ref) => {
		const actionSheetButtons = buttons.map(button => {
			return {
				text: button.text,
				icon: button.icon,
				handler: button.handler,
				cssClass: button.cssClass
			};
		});

		const actionSheetRef = useRef<HTMLIonActionSheetElement | null>(null);

		useImperativeHandle(ref, () => ({
			...actionSheetRef.current!,
			present: async () => {
				await actionSheetRef.current?.present();
			},
			dismiss: async (data?: unknown, role?: string) => {
				return (await actionSheetRef.current?.dismiss(data, role)) || false;
			}
		}));

		useEffect(() => {
			setActionSheet(actionSheetRef.current!);
			setIsRendered(true);
		}, [setActionSheet, setIsRendered]);

		const handleActionSheetDidPresent = () => {
			actionSheetRef.current?.present();
		};

		const handleActionSheetDidDismiss = () => {
			actionSheetRef.current?.dismiss();
		};

		return React.createElement('ion-action-sheet', {
			ref: actionSheetRef,
			header,
			subHeader,
			message,
			cssClass,
			buttons: actionSheetButtons,
			onIonActionSheetDidPresent: handleActionSheetDidPresent,
			onIonActionSheetDidDismiss: handleActionSheetDidDismiss
		});
	}
);

IonActionSheet.displayName = 'IonActionSheet';

export default IonActionSheet;
