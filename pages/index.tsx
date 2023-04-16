import { useContext } from 'react';
import { Container } from '../components/Container';
import { Go } from '../components/Go';
import { AuthContext } from '../context/authContext';

import Button from '../components/Forms/Button';
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
					<Button color={'secondary'}>Users</Button>
				</Go>
				<Button color={'primary'} onClick={presentModal}>
					Open Modal
				</Button>
				<Button color={'tertiary'} onClick={handleLogout}>
					Logout
				</Button>
			</>
		</Container>
	);
}
export default withAuth(Home);
