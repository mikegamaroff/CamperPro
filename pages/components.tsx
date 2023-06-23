import { Container } from '@components/Container';
import Button from '@components/Forms/Button';
import Switch from '@components/Forms/Switch';
import IonRange from '@components/Framework/IonRange';
import { Go } from '@components/Go';
import { Header } from '@components/Header';
import { MenuButton } from '@components/MenuButton';
import { AuthContext } from '@context/authContext';
import useActionSheet from '@hooks/useActionSheet';
import useAlert from '@hooks/useAlert';
import useDatetimeModal from '@hooks/useDatetimeModal';
import useModal from '@hooks/useModal';
import { ActionSheetButton, AlertButton, AlertInput } from '@ionic/core';
import { DateTime } from 'luxon';
import { useContext } from 'react';
import withAuth from './withAuth';

function Components() {
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
	// Helper function to get tomorrow's date
	const getTomorrow = () => {
		const now = DateTime.local();
		const tomorrow = now.plus({ days: 1 });
		return tomorrow.toISODate();
	};

	// Helper function to get next Friday's date
	const getFriday = () => {
		const now = DateTime.local();
		let friday = now;

		// setDay equivalent in Luxon
		while (friday.weekday !== 5) {
			friday = friday.plus({ days: 1 });
		}

		return friday.toISODate();
	};

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
		onDatetimeChange: handleDateChange,
		disabledDates: [getTomorrow() as string, getFriday() as string]
	});
	const rangeSliderHandle = (event: CustomEvent) => {
		console.log('Range value changed:', event.detail.value);
	};
	return (
		<>
			<Header title="logo" left={<MenuButton />} />
			<Container>
				<>
					<Go href="/trips">
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
					<Switch />
					<IonRange handleChange={rangeSliderHandle} dualKnobs />
				</>
			</Container>
		</>
	);
}
export default withAuth(Components);
