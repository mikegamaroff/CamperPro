import { ActionSheetButton } from '@ionic/core';
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
	({ header, subHeader, buttons, setActionSheet, setIsRendered }, ref) => {
		const actionSheetButtons: ActionSheetButton[] = buttons.map(button => ({
			text: button.text,
			role: button.role,
			handler: () => {
				button.handler && button.handler();
				actionSheetRef.current!.dismiss();
			}
		}));
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
			ref: (el: HTMLIonActionSheetElement) => {
				actionSheetRef.current = el;

				if (el) {
					el.header = header;
					el.subHeader = subHeader;
					el.buttons = actionSheetButtons;
					el.addEventListener('ionActionSheetDidPresent', handleActionSheetDidPresent);
					el.addEventListener('ionActionSheetDidDismiss', handleActionSheetDidDismiss);
				}
			}
		});
	}
);

IonActionSheet.displayName = 'IonActionSheet';

export default IonActionSheet;
