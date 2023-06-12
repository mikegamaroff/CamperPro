import { Container } from '@components/Container';
import { IconButton } from '@components/Forms/IconButton';
import { Header } from '@components/Header';
import { IconBackArrow } from '@components/Icons';
import { AuthContext } from '@context/authContext';
import { useContext } from 'react';
import withAuth from '../withAuth';
// eslint-disable-next-line css-modules/no-unused-class
import { useGetAllCampsitesByAuthor } from '@routes/useGetAllCampsites';
function MyCampsites() {
	const { user } = useContext(AuthContext);
	const { myCampsites, isLoading } = useGetAllCampsitesByAuthor({ id: user?._id });

	console.log(myCampsites);

	return (
		<>
			<Header
				title="My Camspites"
				left={<IconButton icon={<IconBackArrow />} onClick={() => history.go(-1)} />}
			/>

			<Container>
				<div className="contentWrapper">My Campsites</div>
			</Container>
		</>
	);
}

export default withAuth(MyCampsites);
