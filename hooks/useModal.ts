import { ReactElement, ReactNode, useCallback, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

interface UseModalProps {
	onCancel: () => void;
	onConfirm: () => void;
	component: ReactElement<any, any> | ReactNode;
}

const useModal = ({ onCancel, onConfirm, component }: UseModalProps) => {
	const [modal, setModal] = useState<HTMLIonModalElement | null>(null);

	const presentModal = useCallback(async () => {
		if (!modal) {
			const m = document.createElement('ion-modal');
			const content = document.createElement('ion-content');
			content.classList.add('ion-padding');

			const ionHeader = document.createElement('ion-header');
			const ionToolbar = document.createElement('ion-toolbar');
			const cancelButton = document.createElement('ion-button');
			const confirmButton = document.createElement('ion-button');
			const ionTitle = document.createElement('ion-title');

			cancelButton.textContent = 'Cancel';
			confirmButton.textContent = 'Confirm';
			ionTitle.textContent = 'Welcome';

			ionToolbar.appendChild(cancelButton);
			ionToolbar.appendChild(ionTitle);
			ionToolbar.appendChild(confirmButton);
			ionHeader.appendChild(ionToolbar);

			const componentContainer = document.createElement('div');
			if (typeof component === 'object' && 'type' in component) {
				ReactDOM.render(component as any, componentContainer);
			} else {
				componentContainer.innerHTML = component as string;
			}
			content.appendChild(componentContainer);

			m.appendChild(ionHeader);
			m.appendChild(content);

			document.body.appendChild(m);
			cancelButton.addEventListener('click', () => {
				onCancel();
				m.dismiss();
			});
			confirmButton.addEventListener('click', () => {
				onConfirm();
				m.dismiss(); // Dismiss the modal after confirming
			});

			setModal(m);
			await m.present(); // Call present after setting the modal
		} else {
			modal.present();
		}
	}, [modal, onCancel, onConfirm, component]);

	const dismissModal = useCallback(() => {
		if (modal) {
			modal.dismiss();
		}
	}, [modal]);

	useEffect(() => {
		return () => {
			if (modal) {
				document.body.removeChild(modal);
				setModal(null);
			}
		};
	}, [modal]);

	return { presentModal, dismissModal };
};

export default useModal;
