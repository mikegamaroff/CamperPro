import { useCallback, useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import Button from '../components/Forms/Button';
import IonContent from '../components/Framework/IonContent';

interface ModalContentProps {
	onCancel: () => void;
	onConfirm: () => void;
	component: JSX.Element;
}

const ModalContent: React.FC<ModalContentProps> = ({ onCancel, onConfirm, component }) => (
	<>
		<div>
			<div>
				<Button
					slot="start"
					onClick={() => {
						onCancel();
					}}
				>
					Cancel
				</Button>
			</div>
			<Button
				slot="end"
				onClick={() => {
					onConfirm();
				}}
			>
				Confirm
			</Button>
		</div>
		<IonContent>
			<div>{component}</div>
		</IonContent>
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
		// eslint-disable-next-line no-console
		console.log('dismissed');
		modalRef.current?.dismiss('cancel');
	}, [modal]);

	return { presentModal, dismissModal };
};

export default useModal;
