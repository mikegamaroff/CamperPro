import React, { useCallback, useState } from 'react';
import { IconButton } from '../components/Forms/IconButton';
import { Header } from '../components/Header';
import { IconCheck, IconClose } from '../components/Icons';

interface ModalContentProps {
	onCancel?: () => void;
	onConfirm?: () => void;
	confirmLabel?: string;
	title?: string;
	component: JSX.Element;
	isVisible: boolean;
	isAnimating: boolean;
}

export const ModalContent: React.FC<ModalContentProps> = React.memo(
	({ onCancel, onConfirm, confirmLabel, title, component, isVisible, isAnimating }) => {
		return (
			<div className={`modal-overlay ${isVisible ? 'visible' : ''}`}>
				<div className={`modal-content ${isAnimating ? 'dismiss' : ''}`}>
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
										icon={<IconCheck />}
										onClick={() => {
											onConfirm && onConfirm();
										}}
										label={confirmLabel || 'Confirm'}
									/>
								</div>
							)
						}
					/>
					{component}
				</div>
			</div>
		);
	}
);
ModalContent.displayName = 'ModalContent>';
interface UseModalProps {
	onCancel?: () => void;
	onConfirm?: () => void;
	title?: string;
	component: JSX.Element;
}

const useModal = ({ onCancel, onConfirm, component, title }: UseModalProps) => {
	const [isVisible, setIsVisible] = useState(false);
	const [isAnimating, setAnimating] = useState(false);

	const presentModal = useCallback((e: any) => {
		e.stopPropagation();
		setAnimating(true);
		setTimeout(() => setIsVisible(true), 0); // Defer until after the render cycle to trigger CSS transitions
	}, []);

	const dismissModal = useCallback(() => {
		setIsVisible(false);
		setAnimating(false);
	}, []);

	return {
		Modal: (
			<ModalContent
				onCancel={onCancel}
				onConfirm={onConfirm}
				component={component}
				title={title}
				isVisible={isVisible || isAnimating}
				isAnimating={isAnimating}
			/>
		),
		presentModal,
		dismissModal
	};
};

export default useModal;
