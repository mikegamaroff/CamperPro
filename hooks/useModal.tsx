import { useCallback, useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { IconButton } from '../components/Forms/IconButton';
import { Header } from '../components/Header';
import { IconClose } from '../components/Icons';

interface ModalContentProps {
	onCancel?: () => void;
	onConfirm?: () => void;
	title?: string;
	component: JSX.Element;
}

const ModalContent: React.FC<ModalContentProps> = ({ onCancel, onConfirm, title, component }) => (
	<>
		<Header
			title={title || 'logo'}
			left={
				<div>
					<IconButton
						size="small"
						icon={<IconClose />}
						onClick={() => {
							onCancel && onCancel();
						}}
					/>
				</div>
			}
			right={
				onConfirm && (
					<div>
						<IconButton
							size="small"
							iconRight
							icon={<IconClose />}
							onClick={() => {
								onConfirm && onConfirm();
							}}
							label="Confirm"
						/>
					</div>
				)
			}
		/>

		<div className="contentWrapper">{component}</div>
	</>
);

const ModalContentLite: React.FC<ModalContentProps> = ({ component }) => <div>{component}</div>;

interface UseModalProps {
	onCancel?: () => void;
	onConfirm?: () => void;
	title?: string;
	component: JSX.Element;
	type?: 'lite';
}

const useModal = ({ onCancel, onConfirm, component, title, type }: UseModalProps) => {
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
				type === 'lite' && m.classList.add('ion-modal-custom');
				// Render the ModalContent component using createRoot
				createRoot(m).render(
					type === 'lite' ? (
						<ModalContentLite component={component} title={title} />
					) : (
						<ModalContent onCancel={onCancel} onConfirm={onConfirm} component={component} title={title} />
					)
				);

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
