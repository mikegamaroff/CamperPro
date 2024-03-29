import { ModalContent } from '@hooks/useModal';
import React, { createContext, ReactNode, useCallback, useState } from 'react';

interface ModalState {
	component: JSX.Element | null;
	title: string;
	onCancel?: () => void;
	onConfirm?: () => void;
	confirmLabel?: string;
}

const initialState: ModalState = {
	component: null,
	title: ''
};

interface ModalContextInterface extends ModalState {
	openModal: ({ component, title, onCancel, onConfirm, confirmLabel }: ModalState) => void;
	closeModal: () => void;
}

export const ModalContext = createContext<ModalContextInterface>({
	...initialState,
	openModal: () => {},
	closeModal: () => {}
});

interface ModalProviderProps {
	children: ReactNode;
}

export const ModalProvider: React.FC<ModalProviderProps> = ({ children }) => {
	const [modalState, setModalState] = useState<ModalState>(initialState);
	const [isVisible, setIsVisible] = useState(false);
	const [isAnimating, setAnimating] = useState(false);

	const openModal = useCallback(({ component, title, onCancel, onConfirm, confirmLabel }: ModalState) => {
		setAnimating(false);
		setTimeout(() => setIsVisible(true), 0);
		setModalState({ component, title, onCancel, onConfirm, confirmLabel });
	}, []);
	const closeModal = useCallback(() => {
		setAnimating(true);
		setTimeout(() => {
			setIsVisible(false);
			setTimeout(() => {
				setAnimating(false);
				setModalState({ ...initialState });
			}, 300);
		}, 0);
	}, []);

	return (
		<ModalContext.Provider value={{ ...modalState, openModal, closeModal }}>
			{children}
			{modalState.component && (
				<ModalContent
					title={modalState.title}
					component={modalState.component}
					onCancel={modalState.onCancel}
					onConfirm={modalState.onConfirm}
					confirmLabel={modalState.confirmLabel}
					isVisible={isVisible}
					isAnimating={isAnimating}
				/>
			)}
		</ModalContext.Provider>
	);
};
