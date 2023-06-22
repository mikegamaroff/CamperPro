import { useCallback, useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';

interface ModalContentProps {
	onCancel?: () => void;
	onConfirm?: () => void;
	title?: string;
	component: JSX.Element;
}

const ModalContentLite: React.FC<ModalContentProps> = ({ component }) => <div>{component}</div>;

interface UseModalProps {
	onCancel?: () => void;
	onConfirm?: () => void;
	title?: string;
	component: JSX.Element;
}

const useModal = ({ onCancel, onConfirm, component, title }: UseModalProps) => {
	const [modal, setModal] = useState<HTMLIonModalElement | null>(null);
	const modalRef = useRef<HTMLIonModalElement | null>(null);

	useEffect(() => {
		modalRef.current = modal;
	}, [modal]);
	const presentModal = useCallback(
		async (e: any) => {
			e.stopPropagation();
			if (!modal) {
				const m = document.createElement('ion-modal') as HTMLIonModalElement;
				m.classList.add('ion-modal-custom');
				// Render the ModalContent component using createRoot
				createRoot(m).render(<ModalContentLite component={component} title={title} />);

				document.body.appendChild(m);

				setModal(m);
				modalRef.current = m;
				await m.present();
			} else {
				modal.present();
			}
		},
		[modal, onCancel, onConfirm, component]
	);

	const dismissModal = useCallback(() => {
		// eslint-disable-next-line no-console
		console.log('dismissed');
		modalRef.current?.dismiss('cancel');
	}, [modal]);

	return { presentModal, dismissModal };
};

export default useModal;
