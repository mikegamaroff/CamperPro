import Link from 'next/link';
import { useContext } from 'react';
import { AuthContext } from '../context/authContext';
import withAuth from './withAuth';

function Home() {
	const { logout } = useContext(AuthContext);

	const handleLogout = () => {
		logout();
	};

	return (
		<>
			<div>
				<Link href="/users">
					<ion-button>Go to Page Two</ion-button>
				</Link>
				<ion-button onClick={handleLogout}>Logout</ion-button>
			</div>
		</>
	);
}
export default withAuth(Home);
