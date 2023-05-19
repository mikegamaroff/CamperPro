import Image from 'next/image';
import { useContext } from 'react';
import { Virtuoso } from 'react-virtuoso';
import { v4 as uuidv4 } from 'uuid';
import { Container } from '../components/Container';
import Button from '../components/Forms/Button';
import { Header } from '../components/Header';
import { MenuButton } from '../components/MenuButton';
import { UploadImageButton } from '../components/UploadImageButton';
import { AuthContext } from '../context/authContext';
import { CampsiteContext } from '../context/campsiteContext';
import { Campsite, EmptyNewCampsite } from '../model/campsite';
import { useAddCampsite } from '../routes/useAddCampsite';
import { useGetAllCampsites } from '../routes/useGetAllCampsites';
import { useGetUser } from '../routes/useGetUser';
import { GoTo } from '../util/GoTo';
import styles from './index.module.css';
import withAuth from './withAuth';
const FeedView: React.FC<{ campsite: Campsite }> = ({ campsite }) => {
	const { updateImage } = useContext(CampsiteContext);
	const { user } = useGetUser(campsite.author);
	return (
		<div className={styles.userHolder}>
			{campsite?.images?.map(image => (
				<Image
					key={image.id}
					src={`/api/images/${image.id}.${image.contentType.split('/')[1]}`}
					alt="Campsite Image"
					width={50}
					height={50}
				/>
			))}
			<div className="card">
				<div>{campsite.title}</div>
				<div>{user?.username}</div>
			</div>
			<div>
				<UploadImageButton<Campsite> documentId={campsite?._id} key={uuidv4()} onSuccess={updateImage} />
			</div>
		</div>
	);
};
function Home() {
	const { campsites, isLoading } =
		useGetAllCampsites(/* {
		filters: { feature: ['river'] }
	} */);
	const { authUser } = useContext(AuthContext); // Access user and status from the AuthContext
	const { addCampsite, isLoading: addCampsiteLoading, isError, isSuccess } = useAddCampsite();

	const handleAddCampsite = async () => {
		const newId = uuidv4(); // replace this with your ID generation logic

		const newCampsite = {
			...EmptyNewCampsite,
			_id: 'campsite:' + newId,
			title: 'Example Campsite',
			author: authUser?.id
			// Add other campsite properties
		};

		try {
			const response = await addCampsite(newCampsite);
			if (response.success) {
				GoTo(`/CampsiteEdit/${newCampsite._id}`);
			} else {
				console.error('Error adding campsite:', response.message);
			}
		} catch (error) {
			console.error('Error adding campsite:', error instanceof Error ? error.message : 'Unknown error');
		}
	};
	return (
		<>
			<Header title="logo" left={<MenuButton />} />

			<Container>
				<>
					<Button onClick={handleAddCampsite}>Add Campsite</Button>
					<div>Gabe Search component</div>
					<Virtuoso
						className={styles.scroller}
						totalCount={campsites.length}
						data={campsites}
						overscan={{ main: 2, reverse: 2 }}
						itemContent={(index, campsite) => <FeedView campsite={campsite} />}
					/>
				</>
			</Container>
		</>
	);
}
export default withAuth(Home);
