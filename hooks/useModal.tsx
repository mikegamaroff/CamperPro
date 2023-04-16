import { useCallback, useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';

interface ModalContentProps {
	onCancel: () => void;
	onConfirm: () => void;
	component: JSX.Element;
}

const ModalContent: React.FC<ModalContentProps> = ({ onCancel, onConfirm, component }) => (
	<>
		<ion-header>
			<ion-toolbar>
				<ion-button
					slot="start"
					onClick={() => {
						console.log('Cancel button clicked');
						onCancel();
					}}
				>
					Cancel
				</ion-button>
				<ion-title>Welcome</ion-title>
				<ion-button
					slot="end"
					onClick={() => {
						console.log('Confirm button clicked');
						onConfirm();
					}}
				>
					Confirm
				</ion-button>
			</ion-toolbar>
		</ion-header>
		<ion-content class="ion-padding">
			<div>{component}</div>
		</ion-content>
	</>
);

interface UseModalProps {
	onCancel: () => void;
	onConfirm: () => void;
	component: JSX.Element;
}

const useModal = ({ onCancel, onConfirm, component }: UseModalProps) => {
	const [modal, setModal] = useState<HTMLIonModalElement | null>(null);
	const modalRef = useRef<HTMLIonModalElement | null>(null);

	useEffect(() => {
		modalRef.current = modal;
	}, [modal]);
	const presentModal = useCallback(async () => {
		if (!modal) {
			const m = document.createElement('ion-modal') as HTMLIonModalElement;

			// Render the ModalContent component using createRoot
			createRoot(m).render(<ModalContent onCancel={onCancel} onConfirm={onConfirm} component={component} />);

			document.body.appendChild(m);

			setModal(m);
			modalRef.current = m;
			await m.present();
		} else {
			modal.present();
		}
	}, [modal, onCancel, onConfirm, component]);

	const dismissModal = useCallback(() => {
		console.log('dismissed');
		modalRef.current?.dismiss('cancel');
	}, [modal]);

	return { presentModal, dismissModal };
};

export default useModal;
