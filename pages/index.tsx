import { useContext } from 'react';
import { Container } from '../components/Container';
import { Go } from '../components/Go';
import { AuthContext } from '../context/authContext';
import useActionSheet from '../hooks/useActionSheet';

import { ActionSheetButton } from '@ionic/core';
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

	const actionSheetButtons: ActionSheetButton[] = [
		{
			text: 'Delete',
			handler: () => {
				console.log('Delete clicked');
			}
		},
		{
			text: 'Share',
			handler: () => {
				console.log('Share clicked');
			}
		},
		{
			text: 'Cancel',
			role: 'cancel',
			handler: () => {
				console.log('Cancel clicked');
			}
		}
	];

	const { presentActionSheet } = useActionSheet({
		header: 'My Action Sheet',
		subHeader: 'Gaby is clever',
		buttons: actionSheetButtons
	});

	const handleButtonClick = () => {
		presentActionSheet();
	};

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
				<Button color={'primary'} onClick={handleButtonClick}>
					Action Sheet
				</Button>
			</>
		</Container>
	);
}
export default withAuth(Home);
