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
				<h2>Hello, world!</h2>
				<p>This is some modal content.</p>
			</div>
		);
	};
	const { presentModal, dismissModal } = useModal({
		onCancel: () => console.log('Canceled'),
		onConfirm: () => console.log(`Confirmed`),
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
