import { ActionSheetButton } from '@ionic/core';
export interface CustomIonActionSheetProps {
	header?: string;
	subHeader?: string;
	message?: string;
	buttons: ActionSheetButton[];
	cssClass?: string;
	onButtonClicked?: (buttonData: { action: string }) => void;
	onDismiss?: () => void;
}
