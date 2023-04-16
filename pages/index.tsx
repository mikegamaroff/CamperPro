import { useContext } from 'react';
import { Container } from '../components/Container';
import { Go } from '../components/Go';
import { AuthContext } from '../context/authContext';

import useModal from '../hooks/useModal';
import withAuth from './withAuth';

function Home() {
	const { logout } = useContext(AuthContext);

	const handleLogout = () => {
		logout();
	};
	const ModalContent = () => {
		return (
			<div>
				<h2>Here a modal</h2>
				<p>You can pass any component or JSX in here.</p>
			</div>
		);
	};
	const confirmModal = () => {
		console.log('Confirmed');
		dismissModal();
	};

	const cancelModal = () => {
		console.log('Canceled');
		dismissModal();
	};
	const { presentModal, dismissModal } = useModal({
		onCancel: cancelModal,
		onConfirm: confirmModal,
		component: <ModalContent />
	});

	return (
		<Container>
			<>
				<Go href="/users">
					<ion-button>Go to Page Two</ion-button>
				</Go>
				<ion-button onClick={presentModal}>Open Modal</ion-button>
				<ion-button onClick={handleLogout}>Logout</ion-button>
			</>
		</Container>
	);
}
export default withAuth(Home);
