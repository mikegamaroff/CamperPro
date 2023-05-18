import Image from 'next/image';
import { useContext } from 'react';
import { Virtuoso } from 'react-virtuoso';
import { v4 as uuidv4 } from 'uuid';
import { Container } from '../../components/Container';
import Button from '../../components/Forms/Button';
import { UploadImageButton } from '../../components/UploadImageButton';
import { CampsiteContext } from '../../context/campsiteContext';
import { Campsite } from '../../model/campsite';
import useDeleteCampsite from '../../routes/useDeleteCampsite';
import useEditCampsite from '../../routes/useEditCampsite';
import { useGetAllCampsites } from '../../routes/useGetAllCampsites';
import useGetCampsite from '../../routes/useGetCampsite';
import { GoTo } from '../../util/GoTo';
import styles from './CampsiteEdit.module.css';
interface Props {
	id: string;
}
const FeedView: React.FC<{
	campsite: Campsite | undefined;
}> = ({ campsite }) => {
	const { updateImage } = useContext(CampsiteContext);
	return (
		<div className={styles.campsiteHolder}>
			{campsite?.images?.map(image => (
				<Image
					key={image.id}
					src={`/images/${image.id}.${image.contentType.split('/')[1]}`}
					alt="Campsite Image"
					width={50}
					height={50}
				/>
			))}
			<div className="card">{campsite?._id}</div>
			<div>
				<UploadImageButton<Campsite> documentId={campsite?._id} key={uuidv4()} onSuccess={updateImage} />
			</div>
		</div>
	);
};
function CampsiteEdit({ id }: Props) {
	const { campsite, isLoading: isFetching, isError: fetchError } = useGetCampsite(id);
	const { editCampsite, isLoading: isEditing, isError: editError, isSuccess: editSuccess } = useEditCampsite();

	const {
		deleteCampsite,
		isLoading: deleting,
		isError: deleteError,
		isSuccess: isDeleteSuccess
	} = useDeleteCampsite();
	const { campsites, isLoading } = useGetAllCampsites();

	if (isFetching || isLoading || !campsite) {
		return <div>Loading..</div>;
	}
	const updateCampsite = () => {
		if (campsite) {
			const updatedCampsite: Campsite = { ...campsite, draft: false };
			editCampsite(updatedCampsite);
		}
	};

	const handleDeleteCampsite = async () => {
		const response = await deleteCampsite(campsite?._id ?? '');
		if (response.success) {
			console.log(response);
			GoTo('/');
		} else {
			console.log(response);
			// Handle error
		}
	};
	return (
		<Container>
			<>
				<div>{id}</div>
				<Button onClick={updateCampsite}>Edit</Button>
				<Button onClick={handleDeleteCampsite}>Delete</Button>
				<Virtuoso
					totalCount={campsites.length}
					style={{ height: 700 }}
					data={campsites}
					overscan={{ main: 2, reverse: 2 }}
					itemContent={(index, campsite) => <FeedView campsite={campsite} />}
				/>
			</>
		</Container>
	);
}

export default CampsiteEdit;
