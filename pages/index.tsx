import { useContext } from 'react';
import { Container } from '../components/Container';
import { Go } from '../components/Go';
import { AuthContext } from '../context/authContext';
import useActionSheet from '../hooks/useActionSheet';

import { ActionSheetButton, AlertButton, AlertInput } from '@ionic/core';
import Button from '../components/Forms/Button';
import useAlert from '../hooks/useAlert';

import useDatetimeModal from '../hooks/useDatetimeModal';
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

	const exampleInputs: AlertInput[] = [
		{ label: 'Red', type: 'radio', value: 'red' },
		{ label: 'Blue', type: 'radio', value: 'blue' },
		{ label: 'Green', type: 'radio', value: 'green' }
	];

	const exampleButtons: AlertButton[] = [
		{
			text: 'Cancel',
			role: 'cancel',
			handler: () => {
				console.log('Alert canceled');
			}
		},
		{
			text: 'OK',
			role: 'confirm',
			handler: () => {
				console.log('Alert confirmed');
			}
		}
	];
	const { presentAlert, dismissAlert } = useAlert({
		header: 'Alert',
		subHeader: 'Important message',
		message: 'This is an alert!',
		buttons: [
			...exampleButtons,
			{
				text: 'Custom Dismiss',
				handler: () => {
					dismissAlert();
				}
			}
		],
		inputs: exampleInputs
	});

	const handleDateChange = (selectedDatetime: string) => {
		// Handle the selected date here
		console.log('Selected Date:', selectedDatetime);
	};

	const { presentDatetimeModal } = useDatetimeModal({
		onDatetimeChange: handleDateChange
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
				<Button color={'primary'} onClick={handleButtonClick}>
					Action Sheet
				</Button>
				<Button color={'primary'} onClick={presentDatetimeModal}>
					Date Picker
				</Button>
				<Button color={'primary'} onClick={presentAlert}>
					alert
				</Button>
			</>
		</Container>
	);
}
export default withAuth(Home);
