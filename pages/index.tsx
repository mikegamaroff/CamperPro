import Link from 'next/link';
import { useContext } from 'react';
import { Container } from '../components/Container';
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
				<Link href="/users">
					<ion-button>Go to Page Two</ion-button>
				</Link>
				<ion-button onClick={handleLogout}>Logout</ion-button>
			</>
		</Container>
	);
}
export default withAuth(Home);
