import { ModalContext } from '@context/modalContext';
import { ModalContent } from '@hooks/useModal';
import { ReactNode, useContext } from 'react';

interface HomeProps {
	children: ReactNode;
}

const Home = ({ children }: HomeProps) => {
	const { component, title, onCancel, onConfirm } = useContext(ModalContext);
	return (
		<>
			{component && (
				<ModalContent
					title={title}
					component={component}
					onCancel={onCancel}
					onConfirm={onConfirm}
					isVisible={false}
					isAnimating={false}
				/>
			)}
			{children}
		</>
	);
};

export default Home;
