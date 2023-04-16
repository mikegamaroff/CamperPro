import { useCallback, useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import IonActionSheet, { IonActionSheetRef } from '../components/Framework/IonActionSheet';
import { CustomIonActionSheetProps } from '../model/framework';
type UseActionSheetProps = CustomIonActionSheetProps;

const useActionSheet = ({ header, subHeader, message, buttons, cssClass }: UseActionSheetProps) => {
	const [actionSheet, setActionSheet] = useState<IonActionSheetRef | null>(null);
	const actionSheetRef = useRef<IonActionSheetRef | null>(null);

	useEffect(() => {
		actionSheetRef.current = actionSheet;
	}, [actionSheet]);

	const presentActionSheet = useCallback(async () => {
		if (!actionSheet) {
			const as = document.createElement('ion-action-sheet') as HTMLIonActionSheetElement;

			// Render the IonActionSheet component using createRoot
			createRoot(as).render(
				<IonActionSheet
					setActionSheet={setActionSheet}
					header={header}
					subHeader={subHeader}
					message={message}
					buttons={buttons}
					cssClass={cssClass}
				/>
			);

			document.body.appendChild(as);

			actionSheetRef.current = as;
			console.log(actionSheetRef);
		} else {
			actionSheet.present();
		}
	}, [actionSheet, header, subHeader, message, buttons, cssClass]);

	const dismissActionSheet = useCallback(() => {
		actionSheetRef.current?.dismiss();
	}, [actionSheet]);

	return { presentActionSheet, dismissActionSheet };
};

export default useActionSheet;
