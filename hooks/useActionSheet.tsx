import { useCallback, useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import IonActionSheet, { IonActionSheetRef } from '../components/Framework/IonActionSheet';

import { CustomIonActionSheetProps } from '../model/framework';
type UseActionSheetProps = CustomIonActionSheetProps;

const useActionSheet = ({ header, subHeader, buttons, cssClass }: UseActionSheetProps) => {
	const [actionSheet, setActionSheet] = useState<IonActionSheetRef | null>(null);
	const [isRendered, setIsRendered] = useState(false);
	const actionSheetRef = useRef<IonActionSheetRef | null>(null);

	useEffect(() => {
		actionSheetRef.current = actionSheet;
	}, [actionSheet]);

	const presentActionSheet = useCallback(() => {
		if (!actionSheet) {
			const as = document.createElement('ion-action-sheet') as HTMLIonActionSheetElement;

			// Render the IonActionSheet component using createRoot
			createRoot(as).render(
				<IonActionSheet
					setActionSheet={setActionSheet}
					header={header}
					subHeader={subHeader}
					buttons={buttons}
					cssClass={cssClass}
					setIsRendered={setIsRendered}
				/>
			);

			const ionApp = document.querySelector('ion-app');
			if (ionApp) {
				ionApp.appendChild(as);
			} else {
				console.error(
					'Could not find ion-app element. Make sure you have an ion-app element in your application.'
				);
			}

			actionSheetRef.current = as;
		} else {
			// If action sheet already exists, just present it
			actionSheet.present();
		}
	}, [actionSheet, header, subHeader, buttons, cssClass]);

	useEffect(() => {
		if (isRendered) {
			actionSheetRef.current?.present();
		} else {
			// Call setIsRendered with false when action sheet is dismissed
			setIsRendered(false);
		}
	}, [isRendered, actionSheetRef]);

	const dismissActionSheet = useCallback(() => {
		actionSheetRef.current?.dismiss();
	}, [actionSheet]);

	return { presentActionSheet, dismissActionSheet };
};

export default useActionSheet;
