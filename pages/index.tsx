import { useContext } from 'react';
import { Container } from '../components/Container';
import { Go } from '../components/Go';
import { AuthContext } from '../context/authContext';
import withAuth from './withAuth';

function Home() {
	const { logout } = useContext(AuthContext);

	const handleLogout = () => {
		logout();
	};

	return (
		<Container>
			<>
				<Go href="/users">
					<ion-button>Go to Page Two</ion-button>
				</Go>
				<ion-button onClick={handleLogout}>Logout</ion-button>
			</>
		</Container>
	);
}
export default withAuth(Home);
