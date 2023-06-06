import { useContext } from 'react';
import { Container } from '../components/Container';
import { UserContext } from '../context/userContext';
import withAuth from './withAuth';

function Menu() {
	const { mode, setMode } = useContext(UserContext);
	return (
		<>
			<Container>
				<>{mode}</>
			</Container>
		</>
	);
}
export default withAuth(Menu);
