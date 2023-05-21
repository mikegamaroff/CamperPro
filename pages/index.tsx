import Image from 'next/image';
import { useContext } from 'react';
import { Virtuoso } from 'react-virtuoso';
import { v4 as uuidv4 } from 'uuid';
import { Container } from '../components/Container';
import { Fab } from '../components/Fab';
import { FeedSearchButton } from '../components/FeedSearchButton';
import { Go } from '../components/Go';
import { Header } from '../components/Header';
import { IconAdd } from '../components/Icons';
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
			<Go href={`/campsite/${campsite._id}`}>
				<div>
					{campsite?.images?.map(image => (
						<Image
							key={image.id}
							src={`/api/images/${image.id}.${image.contentType.split('/')[1]}`}
							alt="Campsite Image"
							width={50}
							height={50}
						/>
					))}
				</div>
			</Go>
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
					<div className="layoutContainer">
						<div id="shelf">
							<div className={styles.feedSearchContainer}>
								<FeedSearchButton />
							</div>
						</div>
						<div className="contentWrapper">
							<div className={styles.feedContainer}>
								<Virtuoso
									totalCount={campsites.length}
									data={campsites}
									overscan={{ main: 2, reverse: 2 }}
									itemContent={(index, campsite) => <FeedView campsite={campsite} />}
								/>
							</div>
						</div>
					</div>
					<Fab icon={<IconAdd />} onClick={handleAddCampsite} />
				</>
			</Container>
		</>
	);
}
export default withAuth(Home);
