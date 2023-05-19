import Image from 'next/image';
import { useContext } from 'react';
import { Virtuoso } from 'react-virtuoso';
import { v4 as uuidv4 } from 'uuid';
import { Container } from '../components/Container';
import { Header } from '../components/Header';
import { MenuButton } from '../components/MenuButton';
import { UploadImageButton } from '../components/UploadImageButton';
import { CampsiteContext } from '../context/campsiteContext';
import { Campsite } from '../model/campsite';
import { useGetAllCampsites } from '../routes/useGetAllCampsites';
import styles from './index.module.css';
import withAuth from './withAuth';
const FeedView: React.FC<{ campsite: Campsite }> = ({ campsite }) => {
	const { updateImage } = useContext(CampsiteContext);
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
			<div className="card">{campsite.title}</div>
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

	console.log(campsites);
	return (
		<>
			<Header title="logo" left={<MenuButton />} />
			<Container>
				<Virtuoso
					className={styles.scroller}
					totalCount={campsites.length}
					data={campsites}
					overscan={{ main: 2, reverse: 2 }}
					itemContent={(index, campsite) => <FeedView campsite={campsite} />}
				/>
			</Container>
		</>
	);
}
export default withAuth(Home);
