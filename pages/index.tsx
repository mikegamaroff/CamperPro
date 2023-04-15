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

	const { presentModal } = useModal({
		onCancel: () => console.log('Cancelled'),
		onConfirm: data => console.log(`Hello ${data}!`)
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
