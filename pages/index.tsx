import { Container } from '../components/Container';
import { Header } from '../components/Header';
import { MenuButton } from '../components/MenuButton';
import { useGetAllCampsites } from '../routes/useGetAllCampsites';
import withAuth from './withAuth';

function Home() {
	const { campsites, isLoading } =
		useGetAllCampsites(/* {
		filters: { feature: ['river'] }
	} */);

	console.log(campsites);
	return (
		<>
			<Header title="logo" left={<MenuButton />} />
			<Container>
				<>Feed</>
			</Container>
		</>
	);
}
export default withAuth(Home);
