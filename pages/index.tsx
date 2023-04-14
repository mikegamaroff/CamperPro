import { useContext } from 'react';
import { Container } from '../components/Container';
import { CustomLink } from '../components/CustomLink';
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
				<CustomLink href="/users">
					<ion-button>Go to Page Two</ion-button>
				</CustomLink>
				<ion-button onClick={handleLogout}>Logout</ion-button>
			</>
		</Container>
	);
}
export default withAuth(Home);
