// useModal.tsx
import { useCallback, useEffect, useState } from 'react';

interface UseModalProps {
	onCancel: () => void;
	onConfirm: (data: string) => void;
}

const useModal = ({ onCancel, onConfirm }: UseModalProps) => {
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

			const ionItem = document.createElement('ion-item');
			const ionLabel = document.createElement('ion-label');
			const ionInput = document.createElement('ion-input');

			ionLabel.textContent = 'Enter your name';
			ionLabel.setAttribute('position', 'stacked');
			ionInput.setAttribute('type', 'text');
			ionInput.setAttribute('label', 'Your name');

			ionItem.appendChild(ionLabel);
			ionItem.appendChild(ionInput);

			content.appendChild(ionItem);
			m.appendChild(ionHeader);
			m.appendChild(content);

			document.body.appendChild(m);
			cancelButton.addEventListener('click', () => {
				onCancel();
				m.dismiss();
			});
			confirmButton.addEventListener('click', () => {
				const input = m.querySelector('ion-input');
				onConfirm(input.value as string);
				m.dismiss(); // Dismiss the modal after confirming
			});

			setModal(m);
			await m.present(); // Call present after setting the modal
		} else {
			modal.present();
		}
	}, [modal, onCancel, onConfirm]);

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

	return { presentModal, dismissModal }; // Added dismissModal to the return value
};

export default useModal;
